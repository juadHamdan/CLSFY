import Table from 'react-bootstrap/Table'

const AppTable = ({features, items, additionalText=''}) => {

    const renderItem = (item, index) => {
        //item = [prop1, prps2, ...]
        return(
          <tr key={index}>
            {item.map((itemProps, index) => <th key={index}> {itemProps}</th>)}
          </tr>
        )
      }

    return (
        <div>
            <Table responsive
                className="table" 
                bordered 
                hover 
                size="sm" >
                <thead>
                    <tr>
                        {features.map((feature, index) => <th key={index}> {feature}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map(renderItem)}
                </tbody>
            </Table>
            {additionalText}
        </div>
    )
}

export default AppTable;