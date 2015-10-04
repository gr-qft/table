import _ from 'lodash';
import stringWidth from 'string-width';

let alignCenter,
    alignLeft,
    alignments,
    alignRight;

alignments = [
    `left`,
    `right`,
    `center`
];

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignLeft = (subject, width) => {
    return subject + _.repeat(` `, width);
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignRight = (subject, width) => {
    return _.repeat(` `, width) + subject;
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignCenter = (subject, width) => {
    let halfWidth;

    halfWidth = width / 2;

    if (halfWidth % 2 === 0) {
        return _.repeat(` `, halfWidth) + subject + _.repeat(` `, halfWidth);
    } else {
        halfWidth = _.floor(halfWidth);

        return _.repeat(` `, halfWidth) + subject + _.repeat(` `, halfWidth + 1);
    }
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 *
 * @param {string} subject
 * @param {number} containerWidth
 * @param {string} alignment (left, right, center)
 * @returns {string}
 */
export default (subject, containerWidth, alignment) => {
    let availableWidth,
        subjectWidth;

    if (!_.isString(subject)) {
        throw new Error(`Subject parameter value must be a string.`);
    }

    if (!_.isNumber(containerWidth)) {
        throw new Error(`Container width parameter value must be a number.`);
    }

    subjectWidth = stringWidth(subject);

    if (subjectWidth > containerWidth) {
        throw new Error(`Subject parameter value width cannot be greater than the container width.`);
    }

    if (!_.isString(alignment)) {
        throw new Error(`Alignment parameter value must be a string.`);
    }

    if (alignments.indexOf(alignment) === -1) {
        throw new Error(`Alignment parameter value must be a known alignment parameter value (left, right, center).`);
    }

    availableWidth = containerWidth - subjectWidth;

    if (alignment === `left`) {
        return alignLeft(subject, availableWidth);
    }

    if (alignment === `right`) {
        return alignRight(subject, availableWidth);
    }

    return alignCenter(subject, availableWidth);
};