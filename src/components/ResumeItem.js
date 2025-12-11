export default function ResumeItem({ title, company, startDate, endDate, details }) {
  return (
    <div
      className="bg-white p-6 sm:p-6 rounded-2xl shadow-md border border-gray-200 text-left w-full"
      data-aos="fade-up"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="italic text-sm text-gray-600">{company}</p>
      <p className="text-sm text-gray-500 mb-2">
        {startDate} – {endDate}
      </p>
      <ul className="list-disc ml-5 sm:ml-5 text-gray-700 text-sm space-y-2">
        {details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
