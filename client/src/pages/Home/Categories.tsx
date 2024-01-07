import { categoryFilters } from "../../constant"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

interface Props {
  selected: string,
  setSelected: (category: string) => void
}

const Categories = ({selected, setSelected} : Props) => {
  
  return (
    <ul className="categories">
      {categoryFilters.map((category) => (
          <button
              key={category}
              type="button"
              className={`chip ${category==selected ? "chip--selected" : "" }`}
              onClick={() => setSelected(category)}
          >
              {category}
          </button>
          ))}
          <div className="categories__overflow"></div>
          <div className="categories__more">
            <ChevronRightIcon className="icon-small categories__chevron" />
          </div>
      </ul>
  )
}

export default Categories
