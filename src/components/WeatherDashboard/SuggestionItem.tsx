import { type AutocompleteResultType } from "../../types.ts";

type SuggestionItemProps =  {
    suggestion: AutocompleteResultType ;
    handleSearch: (latitude: number, longitude: number, city: string) => void;
};

export default function SuggestionItem({ suggestion, handleSearch }: SuggestionItemProps) {
    const getSuggestionText = (suggestion: AutocompleteResultType) => {
        let resultText = suggestion.name;

        // lower case is only for PL
        if (suggestion.admin1) {
            let text = suggestion.admin1;
            if (suggestion.country_code === "PL") {
                text = text.toLowerCase();
            }
            resultText += `, ${text}`;
        }

        if (suggestion.admin2) {
            resultText += `, ${suggestion.admin2}`;
        }

        if (suggestion.country) {
            resultText += `, ${suggestion.country}`;
        }

        return resultText;
    };

    return <li
        key={suggestion.id}
        onClick={() => handleSearch(suggestion.latitude, suggestion.longitude, suggestion.name)}
        className={`
            min-h-12 px-4 flex items-center 
            text-md text-gray-700 hover:bg-blue-500 hover:text-white 
            transition-colors duration-150 cursor-pointer
        `}
    >{getSuggestionText(suggestion)}</li>
}