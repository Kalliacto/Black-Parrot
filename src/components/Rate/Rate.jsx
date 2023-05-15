import React, { memo } from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';

const Rate = memo(({ rate }) => {
    return (
        <span>
            {new Array(5)
                .fill(<Star />, 0, 5)
                .fill(<StarFill stroke='currentColor' fill='#ffe44d' />, 0, rate)}
        </span>
    );
});

export default Rate;
