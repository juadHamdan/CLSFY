import Table from 'react-bootstrap/Table'

const AppTable = ({features, items}) => {

    const renderItem = (item, index) => {
        //item = [prop1, prps2, ...]
        return(
          <tr key={index}>
            <th> {index + 1}</th>
            {item.map((itemProps, index) => <th key={index}> {itemProps}</th>)}
          </tr>
        )
      }

    return (
        <div>
            <Table 
                className="table" 
                bordered 
                hover 
                size="sm" >
                <thead>
                    <tr>
                        <th></th>
                        {features.map((feature, index) => <th key={index}> {feature}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map(renderItem)}
                </tbody>
            </Table>
        </div>
    )
}

export default AppTable;