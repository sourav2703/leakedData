import { Injectable } from '@angular/core';
import { VaultUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserDataService {


private readonly users: VaultUser[] = [
  {
    id: 1,
    name: 'AMIT KUMAR AGRAWAL',
    father_name: 'SRI BISHNU AGRAWAL',
    mobile: '6200651350',
    photo: 'assets/images/avatar-1.svg',
    status: 'Hacked',
    risk: 18,
    confidential: {
      alias: 'Cipher-001',
      aadhaar_card: '928530777000',
      pan_card: 'NA',
      address: 'S/O Sri Bishnu Agrawal, Road N0 - 05 Near Prem S T D, Sree Hari Nagar Devi Mandap, Ranchi GPO Ranchi, Jharkhand, 834001',
      other_numbers: '7547082460',
      email: 'NA',
      notes: 'Demo record for Cyber Vault.'
    }
  },
  {
    id: 2,
    name: 'AJAY KUMAR AGARWAL',
    father_name: 'GANESH PRASAD AGARWAL',
    mobile: '6207642339',
    photo: 'assets/images/avatar-2.svg',
    status: 'Hacked',
    risk: 42,
    confidential: {
      alias: 'Cipher-002',
      aadhaar_card: '439022491093',
      pan_card: 'BGLPA1572P',
      address: 'S/O Ganesh Prasad Agarwal, shri hari nagar road NO-5 near devi mandap, new madhukam, Hehal Ranchi, Jharkhand, 834005',
      other_numbers: '8210007073, 9798423919, 9798941504',
      email: 'ajay.agrawal27ganpati@gmail.com',
      notes: 'Multiple contact numbers detected.'
    }
  },
  {
    id: 3,
    name: 'AJIT KUMAR AGARWAL',
    father_name: 'VISHNU PRASAD AGARWAL',
    mobile: '7547082760',
    photo: 'assets/images/avatar-3.svg',
    status: 'Hacked',
    risk: 31,
    confidential: {
      alias: 'Cipher-003',
      aadhaar_card: '439022491093',
      pan_card: 'NA',
      address: 'New Lains Club Chowk, Devi Mandap Road No-5, Shree Hari Nagar Khet Mahalla ranchi, Ranchi, Ranchi, Jharkhand, 834001',
      other_numbers: '',
      email: 'NA',
      notes: 'Address variations found.'
    }
  },
  {
    id: 4,
    name: 'AVINASH KUMAR SHARMA',
    father_name: 'DYANAND SHARMA',
    mobile: '8797688828',
    photo: 'assets/images/avatar-4.svg',
    status: 'Hacked',
    risk: 27,
    confidential: {
      alias: 'Cipher-004',
      aadhaar_card: '834790360158',
      pan_card: 'NA',
      address: 'S/O Dyanand Sharma, Sharma Niwas, Near Talab, New Madhukam Ps-Sukhdev Nagar Ranchi, Near Talab, RANCHI, Ranchi, JHARKHAND, 834005',
      other_numbers: '9031758240, 9155759095',
      email: 'NA',
      notes: 'Two mobile numbers associated.'
    }
  },
  {
    id: 5,
    name: 'ANISH KUMAR OJHA',
    father_name: 'LATE SHASHI KANT OJHA',
    mobile: '6299552083',
    photo: 'assets/images/avatar-5.svg',
    status: 'Hacked',
    risk: 56,
    confidential: {
      alias: 'Cipher-005',
      aadhaar_card: '433249391768',
      pan_card: 'NA',
      address: '34, jay prakash nagar chunna bhatta, pachhami pahari tola, ranchi ranchi, Ranchi, Ranchi, Jharkhand, 834001',
      other_numbers: '7667282962, 8540857388',
      email: 'anishojha2000@gmail.com',
      notes: 'Email linked with alternate contact.'
    }
  },
  {
    id: 6,
    name: 'NAITIK BARNWAL',
    father_name: '',
    mobile: '7992263551',
    photo: 'assets/images/avatar-6.svg',
    status: 'Hacked',
    risk: 22,
    confidential: {
      alias: 'Cipher-006',
      aadhaar_card: '679917812661',
      pan_card: 'FKQPB9815R',
      address: '',
      other_numbers: '',
      email: 'naitikbarnwal500@gmail.com',
      notes: 'Multiple address entries available.'
    }
  },
  {
    id: 7,
    name: 'NAITIK KUMAR BARNWAL',
    father_name: 'NARENDRA PRASAD BARNWAL',
    mobile: '7645076990',
    photo: 'assets/images/avatar-7.svg',
    status: 'Hacked',
    risk: 48,
    confidential: {
      alias: 'Cipher-007',
      aadhaar_card: '679917812661',
      pan_card: 'FKQPB9815R',
      address: 'c/o narendra prasad, manihli chowk, manihli chowk sumitra sadan, manihli chowk, pumea pumia, sumitra sadan, madhubani, Bihar, 854301',
      other_numbers: '7992263551, 9708953418',
      email: 'nkk010403@gmail.com',
      notes: 'Several phone numbers associated.'
    }
  },
  {
    id: 8,
    name: 'KISHAN KUMAR',
    father_name: 'GORAKH PRASAD',
    mobile: '6200839744',
    photo: 'assets/images/avatar-8.svg',
    status: 'Hacked',
    risk: 35,
    confidential: {
      alias: 'Cipher-008',
      aadhaar_card: '478925523094',
      pan_card: 'NA',
      address: 'S/O Gorakh Prasad, New Madhukam Choudhry Dharmshala Road N- 06, Hehal Ranchi, Jharkhand, 834001',
      other_numbers: '6202840408, 6204114246, 7050594890, 7519973136, 8757773849, 9117053641, 9153770194, 9155759095, 9155840841, 9262571829, 9341587113, 9771735863, 9931705778, 9934165101',
      email: 'NA',
      notes: 'Shared locality with multiple profiles.'
    }
  },
  {
    id: 9,
    name: 'ANKUSH KUMAR',
    father_name: '',
    mobile: '7979874544',
    photo: 'assets/images/avatar-9.svg',
    status: 'Hacked',
    risk: 14,
    confidential: {
      alias: 'Cipher-009',
      aadhaar_card: 'NA',
      pan_card: 'HUFPK4273K',
      address: '',
      other_numbers: '',
      email: '7979874544@ldc.ldc',
      notes: 'Single contact record.'
    }
  },
  {
    id: 10,
    name: 'ALOK KUMAR',
    father_name: 'BHOLA PRASAD BARNWAL',
    mobile: '7979874544',
    photo: 'assets/images/avatar-10.svg',
    status: 'Hacked',
    risk: 25,
    confidential: {
      alias: 'Cipher-010',
      aadhaar_card: '355232322378',
      pan_card: 'NA',
      address: 'S/O Bhola Prasad Barnwal, Road No - 5 J, New Madhukam Devi Mandap Ranchi, HAZARIBAG, Ranchi, JHARKHAND, 834001',
      other_numbers: '8092253559, 8877749004',
      email: 'NA',
      notes: 'Several linked numbers.'
    }
  },
  {
    id: 11,
    name: 'VISHAL KUMAR RAM',
    father_name: 'UMESH RAM',
    mobile: '7367076316',
    photo: 'assets/images/avatar-11.svg',
    status: 'Hacked',
    risk: 30,
    confidential: {
      alias: 'Cipher-011',
      aadhaar_card: '804947376440',
      pan_card: 'NA',
      address: 's/o paltu saw, 00, karde ratu, shiv mandir, kamde po- kamde, ps- ratu, ranchi, Jharkhand, 835222',
      other_numbers: '8102498598, 8651550012, 8797689566, 9142255046, 9608349513',
      email: 'NA',
      notes: 'Location overlap with nearby records.'
    }
  },
    {
    id: 12,
    name: 'SURAJ KUMAR MAHTO',
    father_name: 'JAYRAM MAHTO',
    mobile: '7700883987',
    photo: 'assets/images/avatar-11.svg',
    status: 'Hacked',
    risk: 30,
    confidential: {
      alias: 'Cipher-011',
      aadhaar_card: 'NA',
      pan_card: 'NA',
      address: 'S/O  Jayram Mahto, VILL-DOMBA PS-BHARNO, Domba Gumla, Jharkhand, 835324',
      other_numbers: '6202850793, 7700883987, 918685757575',
      email: 'NA',
      notes: 'Location overlap with nearby records.'
    }
  }

];

  getUsers(): VaultUser[] {
    return this.users;
  }
}
