export interface Service {
	Id: string,
	Name: string,
	Description: string,
	Price: string,
};

export const getEmptyService = (): Service => ({
	Id: "",
	Name: "",
	Description: "",
	Price: "",
});