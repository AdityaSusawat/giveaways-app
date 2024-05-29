export default function Modal({ show, onClose, item }) {
  if (!show) return null;

  const formattedInstructions = item.instructions.replace(/\r\n/g, "<br />");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#292B27] p-8 rounded-xl relative mr-10 ml-10">
        <button
          className="bg-[#272826] text-[#DEFF55] absolute top-7 right-4 text-xl w-10 h-10 border-[#323332] border-[3px]"
          onClick={onClose}
        >
          X
        </button>
        <div className="text-white">
          <h2 className="text-3xl mb-4 font-bold">{item.title}</h2>
          <div className="flex gap-x-8 mt-12">
            <div className="w-[40%]">
              <img
                src={item.image}
                alt={`img${item.id}`}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="w-[60%]">
              <p className="text-lg font-medium">{item.description}</p>
              <div className="flex mt-8">
                <p
                  className="w-[60%]"
                  dangerouslySetInnerHTML={{ __html: formattedInstructions }}
                />
                <div className="w-[40%]">
                  <p>
                    <strong>Worth:</strong> {item.worth}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.type}
                  </p>
                  <p>
                    <strong>Platforms:</strong> {item.platforms}
                  </p>
                  <p>
                    <strong>End Date:</strong> {item.end_date}
                  </p>
                </div>
              </div>

              <a
                href={item.open_giveaway_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 p-2 rounded mt-4 inline-block text-white"
              >
                Get Giveaway
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
