import { CAMPSITES } from '../shared/campsites';
import { PARTNERS } from '../shared/partners';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action ) => {
    return state;
}