# telemedicina-back-end 

#verificar se possui arquivo .env na raiz do projeto antes de rodar o build
AWS_ACCESS_KEY_ID=AKIA2FKSMYSMFBP37EVY
AWS_REGION=sa-east-1
AWS_SECRET_ACCESS_KEY=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
JWT_SECRET=jwtsecret
SENDER_EMAIL_ADDRESS=desenvolvimento@veksti.com
TEMPLATE_DIRECTORY=./source/email/templates
ANIMARE_CONTSELF_CHAVE_PESSOA=ba87392a-41f5-4ec0-806a-72f922e50cd6
ANIMARE_CONTSELF=VHSqo6L3LHJiyb5wRazLemzT7925Ly92IVWJJKNIkTDBrQFcfGvea0R+7SEwI0D97wZDiwRvqz4HXxHQPOMIbZXxwxdde2q0

npm install
npm run build
npx pm2 start build/server.js --name telemedicina-back-end
