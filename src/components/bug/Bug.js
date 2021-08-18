import './Style.css';

function Bug({ item }) {

    return (
        <div className='bugStyle'>
            <h3 className='bugTextStyle'>bug: {item.title} status: {item.status}</h3>
        </div>
    );
}

export default Bug;