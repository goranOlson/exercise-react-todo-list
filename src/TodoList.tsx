import './TodoList.css'

export function TodoList(): JSX.Element {


    return <>
        <section className='todo-list'>
            <h2>Todos:</h2>
            <section className='todo-content'>

                <div className='todo-item'>
                    <div className='todoText'>Nisse about a lot of things</div>
                    <div className='info'>
                        <div>Nisse 240226 15.02</div>
                        <div className='controller'>
                            <i className="up fa fa-arrow-up up"></i>
                            <i className="down fa fa-arrow-down down"></i>
                            <i className="throw fas fa-trash-alt remove"></i>
                            <i className="check fas fa-check done"></i>
                        </div>
                    </div>
                </div>

            </section>
        </section>
    </>

}