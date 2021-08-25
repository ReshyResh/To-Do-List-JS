/**
 * @jest-environment jsdom
 */
import add from './add-item';
import removeSplice from './remove-one';
import editItem from './edit-item';
import checkbox from './checkboxes';
import swap from './swap';
import { setStorage } from './storage';
import clear from './remove-item';


describe('Add/Remove', () => {
    test('Add one new item to the list', () => {
        const arr = [
            {
                description: 'Task 1',
                completed: false,
                index: 1,
            }
        ];
        document.body.innerHTML ='<input id="input-text" value="Item added for test purposes">'
        add(arr);
        add(arr);
        add(arr);
        add(arr);
        expect(arr).toHaveLength(5);
    });
    test('Remove one item from the list', () => {
        const arr = [
            {
                description: 'Task 1',
                completed: false,
                index: 0,
            },
            {
                description: 'Task 2',
                completed: false,
                index: 1,
            }
        ];
        removeSplice(arr,0);
        expect(arr).toHaveLength(1);
    });
});

