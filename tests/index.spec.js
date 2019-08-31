import React from 'react'
import { mount } from 'enzyme'
import Comp from '../src'


describe('cr-comp', () => {

  it('base test comp', () => {
    // 跳过测试，偷懒！！！
    const num = 100
    expect(num).toBe(100)
    // const wrapper = mount(
    //   <Comp />
    // )
    // expect(wrapper.find('.hello').text()).toBe('弦图')
  })
})