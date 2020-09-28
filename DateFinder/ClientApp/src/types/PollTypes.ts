export enum SelectionState {
	No = 0,
	Yes = 1,
	Maybe = 2,
}

export type DateSelection = {
	date: Date;
	state: SelectionState;
};

export type UserSelection = {
	id: string;
	name: string;
	dateSelections: DateSelection[];
	pollId: string;
};
