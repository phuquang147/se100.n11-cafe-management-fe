import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  birthday: faker.date.birthdate(),
  gender: sample(['Nam', 'Nữ']),
  status: sample(['Đang làm', 'Đã nghỉ']),
  role: sample(['Nhân viên', 'Quản lý', 'Chủ quán']),
}));

export default users;
