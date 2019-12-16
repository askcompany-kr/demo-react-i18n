import React from 'react';
import * as generatedMessages from "./translations/i18n";
import {IntlProvider, FormattedMessage, injectIntl, useIntl} from "react-intl";
import {Select} from "antd";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";


class Greeting1 extends React.Component {
  render() {
    const intl = this.props.intl;
    return (
      <div>
        <h2>클래스형 컴포넌트</h2>
        <ul>
          <li>
            hello (string):
            {intl.formatMessage({ id: 'hello' })}
          </li>
          <li>
            hello (component):
            <FormattedMessage id="hello" />
          </li>
          <li>
            homepage.header (string):
            {intl.formatMessage({ id: 'homepage.header' })}
          </li>
        </ul>
      </div>
    );
  }
}

Greeting1 = injectIntl(Greeting1);


function Greeting2() {
  const intl = useIntl();

  return (
    <div>
      <h2>함수형 컴포넌트 with Hook</h2>
      <ul>
        <li>
          hello (string):
          {intl.formatMessage({ id: 'hello' })}
        </li>
        <li>
          hello (component):
          <FormattedMessage id="hello" />
        </li>
        <li>
          homepage.header (string):
          {intl.formatMessage({ id: 'homepage.header' })}
        </li>
      </ul>
    </div>
  );
};


function App() {
  const [locale, setLocale] = useLocalStorage('locale', window.navigator.language);

  const localeAsKey = locale.replace('-', '_').toLowerCase();
  const messages = flattenMessages(generatedMessages[localeAsKey]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div>
        <Greeting1 />
        <Greeting2 />
      </div>

      <hr/>
      <Select defaultValue={locale}
              onChange={value => setLocale(value)}
              style={{ width: 180 }}>
        <Select.Option value={"ko"}>한국어</Select.Option>
        <Select.Option value={"en"}>English</Select.Option>
        <Select.Option value={"zh-CN"}>中文 (중국 본토, 간체)</Select.Option>
      </Select>
    </IntlProvider>
  );
}


function flattenMessages(nestedMessages, prefix='') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if ( typeof value === 'string' ) {
      messages[prefixedKey] = value;
    }
    else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});

}

export default App;
