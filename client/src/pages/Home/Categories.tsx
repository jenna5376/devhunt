import { categoryFilters } from "../../constant"

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
      </ul>
  )
}

export default Categories
