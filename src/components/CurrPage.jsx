import './CurrPage.css'
import { TextField, Card, Button } from "@material-ui/core";
import {useState, useMemo} from "react";

export default (props) => {

    let [currData, setCurrData] = useState({})
    let [initAmount, setInitAmount] = useState(0)
    let [convertedAmount, setConvertedAmount] = useState(0)

    const {
        currInfo,
    } = props

    const handleChangeAmount = ev => setInitAmount(+ev.target.value)

    const converter = () => setConvertedAmount((initAmount * currData.rate.toFixed(2)))

    useMemo(() => {
        setCurrData(currInfo)
    }, [])

    return (

        <div className='wrap'>
            <Card className="container">
                <TextField id="filled-basic"
                           label="Amount to convert"
                           color="primary"
                           size="medium"
                           type="number"
                           onChange={(ev) => handleChangeAmount(ev)}
                />
                <Button className="btn"
                        variant="contained"
                        onClick={converter}
                >Convert
                </Button>
                <p>{`You can get ${convertedAmount} ${currData.code} for this amount of BYN. Pathetic.`}</p>
            </Card>
        </div>
    )
}