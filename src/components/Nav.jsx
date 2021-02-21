import {Button, Card} from "@material-ui/core";
import {NavLink, Route} from "react-router-dom";
import './Nav.css'

import CurrPage from "./CurrPage";

import {useEffect} from "react";

export default () => {

    const URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
    useEffect(() => {
        if (localStorage.getItem('currency')) {
            return
        }

        fetch(URL)
            .then(response => response.json())
            .then(data => localStorage.setItem('currency', JSON.stringify(data)))
    }, [])

    function getCurrInfo(currCode) {
        const data = JSON.parse(localStorage.getItem('currency'))

        const currData = data.find(curr => curr.Cur_Abbreviation === currCode)
        const { Cur_Abbreviation, Cur_OfficialRate } = currData

        return {
            code: Cur_Abbreviation,
            rate: Cur_OfficialRate,
        }
    }

    return (
        <div>
            <Card className="btn-card">
                <Button variant="contained">
                    <NavLink to="/usd">USD</NavLink>
                </Button>

                <Button variant="contained">
                    <NavLink to="/eur">EUR</NavLink>
                </Button>

                <Button variant="contained">
                    <NavLink to="/rub">RUB</NavLink>
                </Button>
            </Card>

            <Route path="/usd"
                   render={(props) => (
                       <CurrPage {...props} currInfo={getCurrInfo('USD')} />
                   )}
            />
            <Route path="/eur"
                   render={(props) => (
                       <CurrPage {...props} currInfo={getCurrInfo('EUR')} />
                   )}
            />
            <Route path="/rub"
                   render={(props) => (
                       <CurrPage {...props} currInfo={getCurrInfo('RUB')} />
                   )}
            />
        </div>
    )
}

