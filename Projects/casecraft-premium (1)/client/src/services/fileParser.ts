import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parseFile(file: File): Promise<string> {
    const extension = file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'txt':
        case 'csv':
        case 'md':
            return await file.text();

        case 'docx':
            return await parseDocx(file);

        case 'xlsx':
        case 'xls':
            return await parseXlsx(file);

        case 'pdf':
            return await parsePdf(file);

        case 'pptx':
            return await parsePpptx(file);

        default:
            throw new Error(`Unsupported file type: ${extension}`);
    }
}

async function parseDocx(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

async function parseXlsx(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    let content = '';
    workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        content += `Sheet: ${sheetName}\n`;
        content += XLSX.utils.sheet_to_csv(worksheet);
        content += '\n\n';
    });
    return content;
}

async function parsePdf(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
}

async function parsePpptx(file: File): Promise<string> {
    const zip = await JSZip.loadAsync(file);
    let fullText = '';

    // Slide files are in ppt/slides/slide[1..n].xml
    const slideFiles = Object.keys(zip.files).filter(path =>
        path.startsWith('ppt/slides/slide') && path.endsWith('.xml')
    ).sort((a, b) => {
        const n1 = parseInt(a.match(/\d+/)?.[0] || '0');
        const n2 = parseInt(b.match(/\d+/)?.[0] || '0');
        return n1 - n2;
    });

    for (const slidePath of slideFiles) {
        const content = await zip.file(slidePath)?.async('text');
        if (content) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(content, 'text/xml');
            const textNodes = xmlDoc.getElementsByTagName('a:t');
            let slideText = '';
            for (let i = 0; i < textNodes.length; i++) {
                slideText += (textNodes[i].textContent || '') + ' ';
            }
            fullText += `Slide ${slidePath.match(/\d+/)?.[0]}: ${slideText}\n\n`;
        }
    }

    return fullText;
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}
