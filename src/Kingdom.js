import React from "react";

const Kingdom = ({ keys, cards, cardLikes } ) => (
    <table className="table table-bordered">
        <thead>
            <tr>
                {
                    keys.map((key) => {
                        return <th key={key}>{key}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{cards}</td>
                <td>{cardLikes}</td>
            </tr>
        </tbody>
    </table>
);

export default Kingdom;