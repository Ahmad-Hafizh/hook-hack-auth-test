import { parseUserInput } from "../lib/utils";

interface ProjectPreviewModalProps {
  isOpen: boolean;
  project: any;
  onClose: () => void;
}

export default function ProjectPreviewModal({
  isOpen,
  project,
  onClose,
}: ProjectPreviewModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181818] rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close preview"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white mb-4">Project Preview</h2>

        {/* Userinput Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#2af0ea] mb-2">
            User Input
          </h3>
          <ul className="bg-[#232323] rounded p-4 text-white text-sm">
            {(() => {
              try {
                const userinput = parseUserInput(project.userinput);
                return Object.entries(userinput).map(([key, value]) => (
                  <li key={key} className="mb-1 flex justify-between gap-2">
                    <span className="font-medium text-gray-300">{key}:</span>
                    <span className="text-white">{String(value)}</span>
                  </li>
                ));
              } catch {
                return <li className="text-red-400">Invalid userinput data</li>;
              }
            })()}
          </ul>
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#fe2858] mb-2">Comment</h3>
          <ul className="bg-[#232323] rounded p-4 text-white text-sm">
            {(() => {
              try {
                const comment = parseUserInput(project.comment);
                return Object.entries(comment).map(([key, value]) => (
                  <li key={key} className="mb-1 flex justify-between gap-2">
                    <span className="font-medium text-gray-300">{key}:</span>
                    <span className="text-white">{String(value)}</span>
                  </li>
                ));
              } catch {
                return <li className="text-red-400">Invalid comment data</li>;
              }
            })()}
          </ul>
        </div>

        {/* Hook Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#facc15] mb-2">Hook</h3>
          <ul className="bg-[#232323] rounded p-4 text-white text-sm">
            {(() => {
              try {
                const hook = parseUserInput(project.hook);
                return Object.entries(hook).map(([key, value]) => (
                  <li key={key} className="mb-1 flex justify-between gap-2">
                    <span className="font-medium text-gray-300">{key}:</span>
                    <span className="text-white">{String(value)}</span>
                  </li>
                ));
              } catch {
                return <li className="text-red-400">Invalid hook data</li>;
              }
            })()}
          </ul>
        </div>
      </div>
    </div>
  );
}
