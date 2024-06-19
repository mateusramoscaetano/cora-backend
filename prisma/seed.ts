import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  await prisma.report.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.petOwner.deleteMany();
  await prisma.report.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.doctor.deleteMany();

  const passwordHash = await hash("12345", 1);

  const doctor1 = await prisma.doctor.create({
    data: {
      name: faker.person.fullName(),
      email: "adm@adm.com",
      password: passwordHash,
      phone: faker.phone.number(),
      pet_owners: { create: [] },
    },
  });
  const doctor2 = await prisma.doctor.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      pet_owners: { create: [] },
    },
  });
  const doctor3 = await prisma.doctor.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      pet_owners: { create: [] },
    },
  });

  const clinic1 = await prisma.clinic.create({
    data: {
      name: faker.person.fullName(),
      email: "clinic@clinic.com",
      password: passwordHash,
      phone: faker.phone.number(),
      address: faker.location.street(),
    },
  });
  const clinic2 = await prisma.clinic.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      address: faker.location.street(),
    },
  });
  const clinic3 = await prisma.clinic.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      address: faker.location.street(),
    },
  });

  const petOwner1 = await prisma.petOwner.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      clinicId: clinic1.id,
      doctorId: doctor1.id,
    },
  });
  const petOwner2 = await prisma.petOwner.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      clinicId: clinic2.id,
      doctorId: doctor2.id,
    },
  });
  const petOwner3 = await prisma.petOwner.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      phone: faker.phone.number(),
      clinicId: clinic3.id,
      doctorId: doctor3.id,
    },
  });

  const pet1 = await prisma.pet.create({
    data: {
      name: faker.word.adjective(),
      age: String(faker.number.int()),
      race: faker.animal.dog(),
      specie: "dog",
      weight: "2kg",
      pet_owner: { connect: { id: petOwner1.id } },
      reports: { create: [] },
    },
  });
  const pet2 = await prisma.pet.create({
    data: {
      name: faker.word.adjective(),
      age: String(faker.number.int()),
      race: faker.animal.dog(),
      specie: "dog",
      weight: "4kg",
      pet_owner: { connect: { id: petOwner2.id } },
      reports: { create: [] },
    },
  });
  const pet3 = await prisma.pet.create({
    data: {
      name: faker.word.adjective(),
      age: String(faker.number.int),
      race: faker.animal.cat(),
      specie: "cat",
      weight: "3kg",
      pet_owner: { connect: { id: petOwner3.id } },
      reports: { create: [] },
    },
  });

  await prisma.pet.createMany({
    data: [
      {
        name: faker.word.adjective(),
        age: String(faker.number.int),
        race: faker.animal.cat(),
        specie: "cat",
        pet_owner_id: petOwner1.id,
        weight: "2kg",
      },
      {
        name: faker.word.adjective(),
        age: String(faker.number.int),
        race: faker.animal.cat(),
        specie: "cat",
        pet_owner_id: petOwner2.id,
        weight: "2kg",
      },
      {
        name: faker.word.adjective(),
        age: String(faker.number.int()),
        race: faker.animal.dog(),
        specie: "dog",
        pet_owner_id: petOwner3.id,
        weight: "2kg",
      },
    ],
  });
}

seed().then(() => {
  console.log("created");
});
