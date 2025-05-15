export interface Client {
	ClientId: string,
	FirstName: string,
	LastName: string,
	CI: string,
	CNP: string,
	CompanyId: string,
	CompanyRole: string,
	Address: string,
	Email: string,
	Phone: string,
	Interests: string,
	BirthDate: string,
	Details: string,
	StatusEmail: string,
	StatusSMS: string
};

export const getEmptyClient = (): Client => ({
	ClientId: "",
	FirstName: "",
	LastName: "",
	CI: "",
	CNP: "",
	CompanyId: "",
	CompanyRole: "",
	Address: "",
	Email: "",
	Phone: "",
	Interests: "",
	BirthDate: "",
	Details: "",
	StatusEmail: "",
	StatusSMS: ""
});