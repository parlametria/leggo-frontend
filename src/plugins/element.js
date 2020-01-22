import Vue from 'vue'
import '../element-variables.scss'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Button,
  ButtonGroup,
  DatePicker,
  Tooltip,
  Tag,
  Icon,
  Row,
  Col,
  Collapse,
  Container,
  Main,
  Footer,
  Loading
} from 'element-ui/lib'

// configure language
locale.use(lang)

Vue.use(Dropdown)
Vue.use(Dialog)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(Container)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)
