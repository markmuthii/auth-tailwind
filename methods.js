const users = [
  {
    id: 1,
    firstName: "Amina",
    lastName: "Yusuf",
    username: "aminay",
    email: "amina@example.com",
    phone: "+2348012345678",
    dob: "1998-04-12",
    gender: "Female",
    createdAt: "2023-01-15 10:30:00",
  },
  {
    id: 2,
    firstName: "Khalid",
    lastName: "Musa",
    username: "khalidm",
    email: "khalid@example.com",
    phone: "+2348123456789",
    dob: "1995-08-03",
    gender: "Male",
    createdAt: "2023-02-20 14:45:00",
  },
  {
    id: 3,
    firstName: "Fatima",
    lastName: "Abdullahi",
    username: "fatimaa",
    email: "fatima@example.com",
    phone: "+2348123456780",
    dob: "1997-11-22",
    gender: "Female",
    createdAt: "2023-03-10 09:15:00",
  },
];

const femaleUsers = users.filter((user) => {
  return user.gender === "Female";
});

console.log(femaleUsers);
