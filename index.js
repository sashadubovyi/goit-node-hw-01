import contactsServices from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsServices.listContacts();
        return console.log(allContacts);
      case "get":
        const oneContact = await contactsServices.getContactById(id);
        return console.log(oneContact);
      case "add":
        const newContact = await contactsServices.addContact(
          name,
          email,
          phone
        );
        return console.log(newContact);
      case "update":
        const updateContact = await contactsServices.updateContact(id, {
          name,
          email,
          phone,
        });
        return console.log(updateContact);
      case "remove":
        const removeContact = await contactsServices.removeContact(id);
        return console.log(removeContact);
      default:
        console.warn("\x1B[31m Unknown action type!");
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();
invokeAction(options);
