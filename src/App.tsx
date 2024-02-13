import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Card from "./components/Card";
import Dropdown from "./components/Dropdown";
import Accordion from "./components/Accordion";
import Switch from "./components/Switch";
import Chip from "./components/Chip";
import ListItem from "./components/ListItem";

const jobTemplateOptions = [
  "Heavy Equipment Operator",
  "Heavy Equipment Service Technician",
  "Equipment Operator",
  "Track Foreman",
  "Track Laborer",
  "Track Machine Operator",
  "Asphalt Plant Foreman",
  "Concrete Paving Foreman",
  "Construction Quality Control Technician",
  "Grade Foreman",
  "Grinding Operator",
  "Heavy Equipment Mechanic",
  "Loader Operator",
  "Off Road Truck Driver",
];

const locationOptions = [
  "New York, NY",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Miami, FL",
  "Chicago, IL",
  "Boston, MA",
  "Houston, TX",
  "Austin, TX",
];

const subsidiaryOptions = [
  "New York, NY",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Miami, FL",
  "Chicago, IL",
  "Boston, MA",
  "Houston, TX",
  "Austin, TX",
];

const seniorityOptions = [
  "Entry-Level Position",
  "Individual Contributor",
  "Manager",
  "Office Staff",
  "Leadership / Management",
];

const documentTypes = [
  "Drug Policies",
  "Employee Handbooks",
  "Equipment Selection",
  "Non-Compete Agreements",
  "Payroll Handbook",
  "PTO Policy",
  "Safety Manuals",
  "Sexual Harassment",
];
const documentStates = [
  "Alabama",
  "California",
  "Colorado",
  "Florida",
  "Illinois",
  "Kansas",
  "New York",
  "Utah",
];

const App: React.FC = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchedTermForSelected, setSearchedTermForSelected] = useState("");
  const [selectedJobTemplates, setSelectedJobTemplates] = useState<string[]>(
    []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSubsidiaries, setSelectedSubsidiaries] = useState<string[]>(
    []
  );
  const [selectedSeniorities, setSelectedSeniorities] = useState<string[]>([]);

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [filteredSelectedDocuments, setFilteredSelectedDocuments] = useState<
    string[]
  >([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    if (
      selectedDocuments.length !==
      documentTypes.length * documentStates.length
    ) {
      setIsAllSelected(false);
    } else {
      setIsAllSelected(true);
    }
  }, [selectedDocuments]);

  useEffect(() => {
    if (searchedTermForSelected !== "") {
      setFilteredSelectedDocuments(
        selectedDocuments.filter((s) =>
          s.toLocaleLowerCase().includes(searchedTermForSelected.toLocaleLowerCase())
        )
      );
    } else {
      setFilteredSelectedDocuments(selectedDocuments);
    }
  }, [searchedTermForSelected, selectedDocuments]);

  const selectAll = () => {
    const allDocuments: string[] = [];
    documentStates.forEach((s) =>
      documentTypes.forEach((t) => allDocuments.push(`${s} - ${t}`))
    );
    setSelectedDocuments(allDocuments);
  };

  const deselectAll = () => {
    setSelectedDocuments([]);
  };

  const availableDocumentListItem = (name: string) => (
    <ListItem
      text={name}
      key={name}
      endIconOnClick={() => {
        !selectedDocuments.includes(name)
          ? setSelectedDocuments([...selectedDocuments, name])
          : setSelectedDocuments(selectedDocuments.filter((d) => d !== name));
      }}
      endIcon={
        <div className="p-1 border rounded border-gray-200 dark:border-gray-700">
          {!selectedDocuments.includes(name) ? (
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          ) : (
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"
              />
            </svg>
          )}
        </div>
      }
    />
  );

  const selectedDocumentListItem = (name: string) => (
    <ListItem
      text={name}
      key={name}
      startIcon={
        <svg
          className="w-4 h-5 text-green-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="m5 12 4.7 4.5 9.3-9"
          />
        </svg>
      }
      endIconOnClick={() =>
        setSelectedDocuments(selectedDocuments.filter((d) => d !== name))
      }
      endIcon={
        <div className="p-1 border rounded border-gray-200 dark:border-gray-700">
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="1 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        </div>
      }
    />
  );

  return (
    <>
      <div className="container mx-auto lg:px-32">
        <div className="flex gap-6">
          <Card className="p-4">
            <div className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-300">
              Available Documents
            </div>
            <div className="my-2">
              <Search
                value={searchedTerm}
                onChange={(e) => {
                  setSearchedTerm(e.target.value);
                }}
              />
            </div>
            <div className="my-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Filter by:
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <Dropdown
                value={selectedJobTemplates}
                title="Job Templates"
                onChange={(v) => setSelectedJobTemplates(v as string[])}
                multiple
                allowSearch
                options={jobTemplateOptions.map((i) => ({
                  label: i,
                  value: i,
                }))}
              />
              <Dropdown
                title="Locations"
                value={selectedLocations}
                onChange={(v) => setSelectedLocations(v as string[])}
                multiple
                allowSearch
                options={locationOptions.map((i) => ({ label: i, value: i }))}
              />
              <Dropdown
                value={selectedSubsidiaries}
                title="Subsidiary"
                onChange={(v) => setSelectedSubsidiaries(v as string[])}
                multiple
                allowSearch
                options={subsidiaryOptions.map((i) => ({ label: i, value: i }))}
              />
              <Dropdown
                value={selectedSeniorities}
                title="Seniority"
                onChange={(v) => setSelectedSeniorities(v as string[])}
                multiple
                allowSearch
                options={seniorityOptions.map((i) => ({ label: i, value: i }))}
              />
            </div>
            {selectedJobTemplates.length +
              selectedLocations.length +
              selectedSubsidiaries.length +
              selectedSeniorities.length >
              0 && (
              <Card className="p-2 my-3 border flex flex-wrap gap-2">
                {selectedJobTemplates.map((i) => (
                  <Chip
                    key={i}
                    label={i}
                    color="green"
                    onRemove={() =>
                      setSelectedJobTemplates(
                        selectedJobTemplates.filter((v) => v !== i)
                      )
                    }
                  />
                ))}
                {selectedLocations.map((i) => (
                  <Chip
                    key={i}
                    label={i}
                    color="blue"
                    onRemove={() =>
                      setSelectedLocations(
                        selectedLocations.filter((v) => v !== i)
                      )
                    }
                  />
                ))}
                {selectedSubsidiaries.map((i) => (
                  <Chip
                    key={i}
                    label={i}
                    color="blue"
                    onRemove={() =>
                      setSelectedSubsidiaries(
                        selectedSubsidiaries.filter((v) => v !== i)
                      )
                    }
                  />
                ))}
                {selectedSeniorities.map((i) => (
                  <Chip
                    key={i}
                    label={i}
                    color="purple"
                    onRemove={() =>
                      setSelectedSeniorities(
                        selectedSeniorities.filter((v) => v !== i)
                      )
                    }
                  />
                ))}
              </Card>
            )}
            <div className="my-2 flex justify-between">
              <div className="my-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                53 Available Documents
              </div>
              <div className="my-2 text-sm text-gray-900 dark:text-gray-300">
                <Switch
                  label="Select All"
                  value={isAllSelected}
                  onChange={(e) => {
                    e.target.checked ? selectAll() : deselectAll();
                  }}
                />
              </div>
            </div>
            <div className="my-2 border overflow-hidden rounded-lg border-orange-500">
              {documentTypes.map((t) => (
                <div
                  key={t}
                  className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                >
                  <Accordion title={t}>
                    {documentStates.map((s) =>
                      availableDocumentListItem(`${s} - ${t}`)
                    )}
                  </Accordion>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-300">
              Selected Documents
            </div>
            <div className="my-2">
              <Search
                value={searchedTermForSelected}
                onChange={(e) => {
                  setSearchedTermForSelected(e.target.value);
                }}
              />
            </div>

            {selectedDocuments.length === 0 ? (
              <div className="px-2 py-4 my-3 border flex flex-col gap-2 border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 rounded-lg ">
                <div className="mx-auto py-2">
                  <svg
                    className="w-full max-w-20 h-auto text-gray-300 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                  </svg>
                </div>
                <div className="text-center font-semibold text-xs mx-8 text-gray-500 dark:text-gray-200">
                  Select documents from the left panel to have employees review
                  them and provide a signature acknowledging review
                </div>
              </div>
            ) : (
              <div className="my-3 border border-green-500  dark:border-green-900 rounded-lg ">
                {filteredSelectedDocuments.length > 0 ? (
                  filteredSelectedDocuments.map((s) =>
                    selectedDocumentListItem(s)
                  )
                ) : (
                  <div className="text-center font-semibold text-xs mx-8 py-12 text-gray-500 dark:text-gray-200">
                    No selected document found for the searched term: '
                    {searchedTermForSelected}'
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
