import React from 'react';

const ComingSoonSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Coming Soon: A11YO Tools
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We're building powerful tools to help you create and manage accessibility statements.
          </p>
        </div>

        <div className="mt-12">
          {/* MailerLite Embed Form */}
          <div id="mlb2-26526571" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-26526571">
            <div className="ml-form-align-center">
              <div className="ml-form-embedWrapper embedForm">
                <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
                  <div className="ml-form-embedContent">
                    <h4>Stay Updated</h4>
                    <p>Subscribe for the latest accessibility news and product updates.</p>
                  </div>
                  <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/1554548/forms/155627677958538794/subscribe" data-code="" method="post" target="_blank">
                    <div className="ml-form-formContent horozintalForm">
                      <div className="ml-form-horizontalRow">
                        <div className="ml-input-horizontal">
                          <div style={{ width: '100%' }} className="horizontal-fields">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input type="email" className="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autoComplete="email" />
                            </div>
                          </div>
                        </div>
                        <div className="ml-button-horizontal primary">
                          <button type="submit" className="primary">Subscribe</button>
                          <button disabled style={{ display: 'none' }} type="button" className="loading">
                            <div className="ml-form-embedSubmitLoad"></div>
                            <span className="sr-only">Loading...</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="ml-submit" value="1" />
                    <div className="ml-mobileButton-horizontal">
                      <button type="submit" className="primary">Subscribe</button>
                      <button disabled style={{ display: 'none' }} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                    <input type="hidden" name="anticsrf" value="true" />
                  </form>
                </div>
                <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                  <div className="ml-form-successContent">
                    <h4>Thank you!</h4>
                    <p>You have successfully joined our subscriber list.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 