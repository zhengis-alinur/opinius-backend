export type Review = {
	id: number;
	categoryId: number;
	userId: number;
	title: string;
	img: string;
	objectName: string;
	text: string;
	grade: number;
	image: string;
};

export type Like = {
	id: number;
	userId: number;
	reviewId: number;
};

export type Rating = {
	id: number;
	userId: number;
	reviewId: number;
	rating: number;
};

export type Comment = {
	id: number;
	userId: number;
	reviewId: number;
	comment: string;
};
