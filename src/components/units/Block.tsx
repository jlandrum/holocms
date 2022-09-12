import { i } from "../../lang/I18N";
import BlockDef from "../../models/BlockDef";

interface BlockProps {
  content?: BlockDef;
}

const Block = ({content}: BlockProps) => {
  return (
    <div>
      <span className="text-xs my-2 flex border rounded-md p-2 dark:border-neutral-800">
        {i(`block--${content?.type}`)}
      </span>
    </div>
  )
}

export default Block;