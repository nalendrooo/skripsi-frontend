interface IDataUser {
    id: number;
    name: string;
    divisionTitle: string;
    code: string;
    telephone: string;
    _count: number
}

export interface IResUserModel {
    data: {
        data: IDataUser[];
    }
}

export interface IBodyLoginModel {
    email: string;
    password: string;
}

export interface IBodyCreateOperatorModel {
    email: string;
    password: string
    name: string;
    telephone: string;
    divisionId: number
}
export interface IBodyCreateUserModel {
    code: string;
    name: string;
    telephone: string;
    divisionId: number
}

interface Division {
  title: string;
}

export interface IDataOperator {
   id: number;
  name: string;
  email: string;
  telephone: string;
  adminRole: 'OPERATOR' | 'ADMIN' | 'USER'; // Tambahkan opsi lain jika ada
  updatedAt: string; // Bisa juga pakai Date jika ingin parsing sebagai objek Date
  createdAt: string;
  division: Division;
}

export interface IResOperatorModel {
    data: {
        data: IDataOperator[]
    }
}
