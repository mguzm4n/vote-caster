
const CreateVoteForm = () => {
  // Para indicar el ruteo se podría hacer algo como una command-line arribita
  return (
    <div className="flex flex-col gap-2">
        <div>
          Estás creando una nueva votación
        </div>
        <div className="p-2 w-ful h-full bg-gray-300 rounded">
          <p>
            ¡Aún no hay ninguna pregunta creada en esta colección!
          </p>
          <p>
            Comienza <button className="underline inline">añadiendo al menos una</button> para enviar una votación.
          </p>
        </div>
    </div>
  )
};

export default CreateVoteForm;
