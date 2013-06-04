REMOTE_SERVICE=analogzen
SSH_CONN := analogzen@analogzen.com
REMOTE_PATH := /home/analogzen/analogzen.com

include webawesome/vars.mk

# override for EmberJS
HANDLEBARS_BIN := ember-precompile


ALL_ARTIFACTS_DEV := 	dist/public/index.html \
					$(ALL_JS:.js=.js) \
					$(ALL_CSS:.css=.css) \



ALL_ARTIFACTS_LIVE := dist/public/index.html \
					$(ALL_JS:.js=.min.js) \
					$(ALL_CSS:.css=.min.css) \


ALL_ARTIFACTS := 	$(ALL_ARTIFACTS_DEV)


CDN_JS_DEPS := "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js" \
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.runtime.min.js" \
			"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap.min.js" \
			"//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-rc.2/ember.min.js" \
			"//cdnjs.cloudflare.com/ajax/libs/ember-data.js/0.8.0-latest20121123/ember-data-latest.min.js" \
			"//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.5/require.min.js" \
			#

JS_DEPS := 	dist/public/js/libs/jquery-1.9.1.js \
			dist/public/js/libs/handlebars-1.0.0-rc.3.js \
			dist/public/js/libs/bootstrap.js \
			dist/public/js/libs/ember-latest.js \
			dist/public/js/libs/ember-data-latest.js \
			dist/public/js/libs/require.js \
			$(GENERATED_JS) \
			#

			

CSS_DEPS := 	dist/public/css/normalize.css \
				dist/public/css/bootstrap.css \
				dist/public/css/bootstrap-responsive.css \
				#

TSD_LIBS := 	node \
				express \
				connect \
				jquery \
				ember \
				nodemailer \
				#


include webawesome/targets.mk


# your targets here.