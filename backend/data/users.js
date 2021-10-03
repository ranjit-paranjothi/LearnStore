import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Ranjit',
        email: 'admin@learnStore.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Tim',
        email: 'tim@learnStore.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'vivi',
        email: 'vivi@learnStore.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;