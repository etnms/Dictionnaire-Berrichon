import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [responseServer, setResponseServer] = useState<string>("");
  const [colorResponseServer, setColorResponse] = useState<string>("");
  const sendInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_contact: email,
            subject: "Dictionnaire Berrichon en ligne",
            message: message,
          }),
        }
      );

      if (response.ok) {
        setColorResponse("text-green-500");
        setResponseServer("Votre message a été envoyé !");
        // Clear the fields
        setMessage("");
        setEmail("");
      } else {
        setColorResponse("text-red-500");
        setResponseServer("Erreur : votre message n'a pas pu être envoyé.");
      }
    } catch (error) {
      setColorResponse("text-red-500");
      setResponseServer("Erreur : votre message n'a pas pu être envoyé.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Reset response message as there is a new input
    setResponseServer("");
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };
  return (
    <form
      aria-label="Formulaire de contact"
      className="w-2/4 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onSubmit={(e) => {
        e.preventDefault();
        sendInfo();
      }}
    >
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Votre message
      </label>
      <textarea
        id="message"
        className="block p-2.5 w-full h-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Votre message"
        name="message"
        value={message}
        onChange={handleInputChange}
      ></textarea>
      <div className="mt-2.5">
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Votre courriel
        </label>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>

          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="courriel@adresse.com"
            id="email-address-icon"
            name="email"
            value={email}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div className="flex items-center">
        <button
          aria-label="Envoyer"
          type="submit"
          className="my-2 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Envoyer
        </button>
      </div>
      {responseServer === "" ? null : (
        <p className={colorResponseServer}>{responseServer}</p>
      )}
    </form>
  );
};

export default ContactForm;
