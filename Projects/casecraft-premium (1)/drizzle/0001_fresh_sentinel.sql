CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`author_name` varchar(255) DEFAULT 'Steve Griffiths',
	`image_url` varchar(1024),
	`category` varchar(100) DEFAULT 'Legal Insights',
	`published_at` timestamp DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `evidence_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`raw_text` text NOT NULL,
	`refined_summary` text,
	`file_metadata` text,
	`status` enum('pending','processed','archived') NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evidence_logs_id` PRIMARY KEY(`id`)
);
