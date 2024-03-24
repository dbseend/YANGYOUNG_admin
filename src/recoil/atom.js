import {atom} from "recoil";

export const serialNumberState = atom({
    key: 'serialNumberState',
    default: ''
});

export const studentsSeletedState = atom({
    key: 'studentsSeletedState',
    default: []
});

// 학생 정보 아톰
export const studentAtom = atom({
  key: 'studentAtom',
  default: [
    {
      id: 0,
      name: '',
      school: '',
      grade: '',
      studentPhoneNumber: '',
      parentPhoneNumber: '',
      sectionNameList: []
    }
  ]
});

// 학년 리스트 아톰
export const gradeListAtom = atom({
  key: 'gradeListAtom',
  default: ['']
});

// 학교 리스트 아톰
export const schoolListAtom = atom({
  key: 'schoolListAtom',
  default: ['']
});

// 전체 데이터 사이즈 아톰
export const sizeAtom = atom({
  key: 'sizeAtom',
  default: 0
});