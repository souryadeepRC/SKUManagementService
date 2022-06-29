const Record = (props) => {

    const recordHeader = (
        <thead>
            <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Data</th>
            </tr>
        </thead>)
    if (props.data.length === 0) {
        return (<div><p>No Records found!</p></div>)
    }
    console.log('Record :=',props.data);
    return (
        <div>
            <table>
                {recordHeader}
                <tbody>
                    {props.data.map(item => {
                        return (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.SKU}</td>
                            <td>{item['Product Name']}</td>
                            <td>{item.Price}</td>
                            <td>{item.Date}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Record