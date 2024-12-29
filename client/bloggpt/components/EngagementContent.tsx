interface EngagementContentProps {
  content: string;
}

const EngagementContent: React.FC<EngagementContentProps> = ({ content }) => (
  <div className="mt-4 p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
    <h3 className="text-lg font-semibold text-slate-600">
      Enjoy this while you wait:
    </h3>
    <p className="mt-2 text-gray-700">{content}</p>
  </div>
);

export default EngagementContent;
