import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/static/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constant'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { saveBillList } from '@/store/slices/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
    const navigate = useNavigate()

    // bill typ state : pay or income
    const [billType, setBillType] = useState('pay')

    // input money state
    const [money, setMoney] = useState()
    const onChangeMoney = (value) => {
        setMoney(value)
    }

    // bill type state
    const [useFor, setUseFor] = useState('')

    // date state
    const [dateVisible, setDateVisible] = useState(false)
    const [datePicked, setDatePicked] = useState()

    const confirmDatePick = (value) => {
        console.log(value)
        setDateVisible(false)
        setDatePicked(value)
    }

    // save bill 
    const dispatch = useDispatch()

    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: datePicked,
            useFor: useFor
        }
        dispatch(saveBillList(data))
    }

    // picked date display
    const getDayString = () => {
        const day = dayjs(datePicked).format('YYYY-MM-DD')
        const today = dayjs(new Date()).format('YYYY-MM-DD')
        return day === today ? ' 今天' : day
    }

    return (
        <div className="keepAccounts">
            <NavBar
                className="nav"
                onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        onClick={() => { setBillType('pay') }}
                        className={billType==='pay' ? 'selected':''}
                    >
                        支出
                    </Button>
                    <Button
                        className={billType === 'income' ? 'selected' : ''}
                        onClick={() => { setBillType('income') }}
                        shape="rounded"
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar"
                                className="icon" />
                            <span className="text"
                                onClick={() => setDateVisible(true)}
                            >{getDayString()}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={confirmDatePick}
                                onCancel={() => setDateVisible(false)}
                                onClose={() => setDateVisible(false)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={ money }
                                onChange={onChangeMoney}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected': ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type}
                                                />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button
                    className="btn save"
                    onClick={saveBill}
                >
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New