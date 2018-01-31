import React from 'react'
import Hello from './Hello';

describe('Hello Component', () => {
    const wrapper = mount(<Hello />);

    it(`CLASSNAME: default`, () => {    
        expect(wrapper.find('div').props().className).to.equal('default');
    });

    it(`TEXT: Hello Wolrd`, () => {    
        expect(wrapper.find('div').text()).to.equal('Hello World');
    });
});
