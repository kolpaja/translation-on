import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import GlobeIcon from './components/GlobeIcon'

import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'sq',
    name: 'Shqip',
    country_code: 'al',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]

function App() {
  const { t } = useTranslation();
  console.log(document.querySelector('html').lang);

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

  const release = new Date("2021-03-07");
  const timediff = new Date() - release;
  const number_of_days = Math.floor(timediff / (1000 * 60 * 60 * 24))


  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <div className="container my-2">
      <div className="d-flex justify-content-end">
        <div className="dropdown">
          <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <GlobeIcon width="24" height="24" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <span className="dropdown-item-text">{t('language')}</span>
            </li>
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <a
                  href="#"
                  className={classNames('dropdown-item', {
                    disabled: currentLanguageCode === code,
                  })}
                  onClick={() => {
                    i18next.changeLanguage(code)
                  }}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="mb-3 font-weight-normal">
          {t("welcome_message")}
        </h1>
        <p>
          {t("days_since_release", { number_of_days })}
        </p>
      </div>
    </div>
  );
}

export default App;
