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

        const currData = data.find(curr => curr.Cur_Abbreviation === currCode.toUpperCase())
        const { Cur_Abbreviation, Cur_OfficialRate, Cur_Scale } = currData

        return {
            code: Cur_Abbreviation,
            rate: Cur_OfficialRate,
            scale: Cur_Scale,
        }
    }

    const currInfo = [
        getCurrInfo('usd'),
        getCurrInfo('eur'),
        getCurrInfo('rub'),
    ];

    return (
        <div>

            <Card className="btn-card">
                {
                    currInfo.map((curr, index) => {
                        return (
                            <Button variant="contained" key={index}>
                                <NavLink to={`/${curr.code.toLowerCase()}`}>{curr.code.toUpperCase()}</NavLink>
                            </Button>
                        )
                    })
                }
            </Card>

            {
                currInfo.map((curr, index) => {
                    return (
                        <Route path={`/${curr.code.toLowerCase()}`}
                               render={(props) => (
                                   <CurrPage {...props} currInfo={getCurrInfo(curr.code)} />
                               )}
                        />
                    )
                })
            }

            {/*<Route path="/usd"*/}
            {/*       render={(props) => (*/}
            {/*           <CurrPage {...props} currInfo={getCurrInfo('usd')} />*/}
            {/*       )}*/}
            {/*/>*/}
            {/*<Route path="/eur"*/}
            {/*       render={(props) => (*/}
            {/*           <CurrPage {...props} currInfo={getCurrInfo('eur')} />*/}
            {/*       )}*/}
            {/*/>*/}
            {/*<Route path="/rub"*/}
            {/*       render={(props) => (*/}
            {/*           <CurrPage {...props} currInfo={getCurrInfo('rub')} />*/}
            {/*       )}*/}
            {/*/>*/}
        </div>
    )
}

