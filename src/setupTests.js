import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// If you're using the fetch API
import fetch from 'node-fetch'

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() })

global.fetch = fetch
