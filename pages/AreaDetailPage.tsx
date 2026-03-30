
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';

interface BenefitDetail {
    title: string;
    subtitle?: string;
    description: string;
    qualifications: string[];
    documents: string[];
    proofs: string[];
}

interface AreaData {
    title: string;
    subtitle: string;
    heroImage: string;
    intro: string;
    benefits: BenefitDetail[];
    whatsappNumber: string;
    whatsappMessage: string;
}

const areasData: Record<string, AreaData> = {
    previdenciario: {
        title: 'Direito Previdenciário',
        subtitle: 'Protegemos seus direitos junto ao INSS com dedicação e expertise.',
        heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
        intro: 'O Direito Previdenciário garante a proteção social do trabalhador e de seus dependentes. Nosso escritório atua na defesa de aposentadorias, auxílios, pensões e revisões de benefícios negados ou concedidos de forma incorreta pelo INSS. Veja abaixo em qual situação você pode se encaixar:',
        benefits: [
            {
                title: 'Aposentadoria por Idade e Tempo de Contribuição',
                description: 'Se você trabalhou por muitos anos e já atingiu a idade mínima ou o tempo de contribuição necessário, pode ter direito Á  aposentadoria. Muitos segurados perdem benefícios por desconhecer as regras de transição após a Reforma da Previdência.',
                qualifications: [
                    'Ter pelo menos 65 anos (homem) ou 62 anos (mulher) para aposentadoria por idade',
                    'Ter pelo menos 15 anos (mulheres) ou 20 anos (homens) de contribuição ao INSS',
                    'Trabalhadores que contribuíram antes de 13/11/2019 podem se encaixar nas regras de transição com condições mais favoráveis',
                    'Servidores públicos e profissionais de categorias especiais podem ter regras diferenciadas',
                ],
                documents: [
                    'Carteira de Trabalho (CTPS) ââ¬" todas as páginas com registros',
                    'Extrato do CNIS (Cadastro Nacional de Informações Sociais)',
                    'Documentos pessoais: RG, CPF e comprovante de residência',
                    'Carnês de contribuição (para autônomos ou contribuintes individuais)',
                ],
                proofs: [
                    'Holerites ou contracheques antigos que comprovem vínculos empregatícios',
                    'Declarações de empregadores anteriores',
                    'Guias de recolhimento do INSS (GPS) para contribuintes individuais',
                    'Certidão de Tempo de Contribuição (se servidor público)',
                ],
            },
            {
                title: 'Aposentadoria Rural',
                description: 'O trabalhador rural tem direito a condições especiais de aposentadoria, podendo se aposentar 5 anos antes do trabalhador urbano. Porém, comprovar a atividade rural é o maior desafio, e muitos pedidos são negados por falta de documentação adequada.',
                qualifications: [
                    'Ter exercido atividade rural por pelo menos 15 anos',
                    'Ter 60 anos (homem) ou 55 anos (mulher)',
                    'Não é obrigatório ter contribuído formalmente ao INSS',
                    'Inclui agricultores, pescadores artesanais, garimpeiros e membros de famílias que trabalham em regime de economia familiar',
                ],
                documents: [
                    'Certidão de casamento ou nascimento com profissão de lavrador/agricultor',
                    'Declaração do Sindicato dos Trabalhadores Rurais',
                    'Notas fiscais de venda de produção rural',
                    'Contrato de arrendamento ou parceria rural',
                ],
                proofs: [
                    'Fotos do trabalho na roça, da propriedade ou da produção',
                    'Depoimento de testemunhas (vizinhos, compradores de produção)',
                    'Cadastro no INCRA ou ITR (Imposto Territorial Rural)',
                    'Histórico escolar de escola rural dos filhos',
                ],
            },
            {
                title: 'BPC/LOAS (Benefício de Prestação Continuada)',
                description: 'O BPC é um benefício assistencial de 1 salário mínimo mensal destinado a idosos acima de 65 anos ou pessoas com deficiência de qualquer idade que vivem em situação de vulnerabilidade econômica. Não exige contribuição ao INSS.',
                qualifications: [
                    'Idosos com 65 anos ou mais OU pessoas com deficiência de longo prazo (física, mental, intelectual ou sensorial)',
                    'Renda familiar per capita inferior a 1/4 do salário mínimo (em alguns casos, até 1/2)',
                    'Estar inscrito no CadÃÅ¡nico (Cadastro ÃÅ¡nico para Programas Sociais)',
                    'Não receber nenhum outro benefício previdenciário ou assistencial (exceto assistência médica)',
                ],
                documents: [
                    'Documentos pessoais de todos os membros da família',
                    'Comprovante de inscrição no CadÃÅ¡nico',
                    'Comprovante de residência atualizado',
                    'Declaração de composição e renda familiar',
                ],
                proofs: [
                    'Laudos médicos e exames que comprovem a deficiência (para PCD)',
                    'Comprovantes de renda de todos os membros da família',
                    'Conta de água, luz ou aluguel que evidencie condição de vulnerabilidade',
                    'Relatório social do CRAS (se disponível)',
                ],
            },
            {
                title: 'Auxílio-Doença e Aposentadoria por Invalidez',
                description: 'Quando uma doença ou acidente impede você de trabalhar, você tem direito a receber auxílio-doença (incapacidade temporária) ou aposentadoria por invalidez (incapacidade permanente). Muitos pedidos são negados injustamente na perícia do INSS.',
                qualifications: [
                    'Estar incapacitado para o trabalho por mais de 15 dias consecutivos',
                    'Ter qualidade de segurado (estar contribuindo ou no período de graça)',
                    'Ter pelo menos 12 contribuições mensais (carência) ââ¬" exceto para acidentes ou doenças graves da lista do INSS',
                    'A incapacidade deve ser comprovada por perícia médica',
                ],
                documents: [
                    'Laudos médicos detalhados e atualizados',
                    'Exames de imagem (raio-x, ressonância, tomografia)',
                    'Receitas médicas e relatórios de tratamento',
                    'Atestados médicos com CID da doença',
                ],
                proofs: [
                    'Prontuários médicos e histórico de consultas',
                    'Relatório do médico do trabalho ou da empresa',
                    'CAT (Comunicação de Acidente de Trabalho) se for acidente laboral',
                    'Comprovante de afastamento do trabalho pela empresa',
                ],
            },
            {
                title: 'Pensão por Morte',
                description: 'Ao perder um ente querido que era segurado do INSS, os dependentes têm direito a receber pensão por morte. O valor e a duração dependem da idade do dependente, do tipo de relação e do tempo de contribuição do falecido.',
                qualifications: [
                    'Ser cônjuge, companheiro(a), filho menor de 21 anos (ou inválido/com deficiência de qualquer idade)',
                    'Pais que comprovem dependência econômica do falecido',
                    'Irmãos menores de 21 anos (ou inválidos) que comprovem dependência',
                    'O falecido precisava ter qualidade de segurado na data do óbito',
                ],
                documents: [
                    'Certidão de óbito do segurado falecido',
                    'Documentos pessoais do dependente requerente',
                    'Certidão de casamento ou declaração de união estável',
                    'Certidão de nascimento dos filhos menores',
                ],
                proofs: [
                    'Comprovantes de união estável (fotos, conta conjunta, correspondências)',
                    'Comprovantes de dependência econômica (para pais e irmãos)',
                    'Extrato do CNIS ou carteira de trabalho do falecido',
                    'Comprovante de que o falecido era segurado ativo ou no período de graça',
                ],
            },
            {
                title: 'Revisão de Benefícios',
                description: 'Se você já recebe um benefício do INSS mas desconfia que o valor está abaixo do correto, é possível pedir revisão. Erros de cálculo do INSS são mais comuns do que se imagina, e muitos aposentados deixam de receber milhares de reais.',
                qualifications: [
                    'Estar recebendo benefício previdenciário há menos de 10 anos (prazo decadencial)',
                    'Identificar que períodos de contribuição não foram computados no cálculo',
                    'Perceber que atividades especiais (insalubridade/periculosidade) não foram reconhecidas',
                    'Verificar que o INSS aplicou índices de correção incorretos',
                ],
                documents: [
                    'Carta de concessão do benefício atual',
                    'Extrato do CNIS atualizado',
                    'Carteira de Trabalho com todos os registros',
                    'PPP (Perfil Profissiográfico Previdenciário) para atividades especiais',
                ],
                proofs: [
                    'Holerites antigos que mostrem salários não computados',
                    'Laudos técnicos de insalubridade/periculosidade',
                    'Cálculos demonstrativos do valor correto do benefício',
                    'Memória de cálculo do INSS (pode ser obtida por processo administrativo)',
                ],
            },
        ],
        whatsappNumber: '5592999999999',
        whatsappMessage: 'Olá! Gostaria de uma consulta sobre Direito Previdenciário.',
    },
    bancario: {
        title: 'Direito Bancário',
        subtitle: 'Combatemos práticas abusivas de bancos e instituições financeiras.',
        heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
        intro: 'O Direito Bancário protege o consumidor contra abusos cometidos por bancos, financeiras e instituições de crédito. Nosso escritório atua na revisão de contratos, cobrança de valores indevidos e defesa contra negativações injustas. Veja abaixo em qual situação você pode se encaixar:',
        benefits: [
            {
                title: 'Revisão de Juros Abusivos',
                description: 'Contratos com taxas de juros acima da média de mercado são considerados abusivos. Empréstimos pessoais, financiamentos e cartões de crédito frequentemente possuem cláusulas que violam o Código de Defesa do Consumidor.',
                qualifications: [
                    'Possuir contrato de empréstimo, financiamento ou cartão de crédito com taxas acima da média do Banco Central',
                    'Estar pagando parcelas com valor muito superior ao esperado',
                    'Ter percebido cobrança de juros sobre juros (anatocismo) ou capitalização diária',
                    'Notar que o saldo devedor não diminui mesmo com pagamento regular das parcelas',
                ],
                documents: [
                    'Contrato original do empréstimo ou financiamento',
                    'Extratos bancários dos últimos 12 meses',
                    'Comprovantes de pagamento das parcelas',
                    'Tabela de amortização fornecida pelo banco',
                ],
                proofs: [
                    'Simulação comparativa com taxas médias do Banco Central',
                    'Print da taxa média de mercado disponível no site do Banco Central',
                    'Correspondências ou e-mails do banco sobre o contrato',
                    'Demonstrativo da evolução do saldo devedor',
                ],
            },
            {
                title: 'Empréstimo Consignado Indevido',
                description: 'Descontos não autorizados no seu salário ou benefício do INSS por empréstimos que você não contratou é uma prática ilegal cada vez mais comum. Aposentados e pensionistas são as maiores vítimas dessa fraude.',
                qualifications: [
                    'Ter desconto em folha de pagamento ou benefício do INSS por empréstimo não reconhecido',
                    'Ter sido vítima de vendedores que contrataram empréstimo sem seu conhecimento',
                    'Ter margem consignável comprometida acima do limite legal de 45%',
                    'Ter assinado contrato sem entender as condições ou sob pressão/engano',
                ],
                documents: [
                    'Extratos bancários mostrando os descontos indevidos',
                    'Extrato de consignações do INSS (para aposentados)',
                    'Contracheque mostrando os descontos (para trabalhadores)',
                    'Documentos pessoais: RG, CPF e comprovante de residência',
                ],
                proofs: [
                    'Print do extrato de empréstimos consignados no Meu INSS',
                    'Boletim de ocorrência (em caso de fraude)',
                    'Registro de reclamação junto ao banco',
                    'Gravações de ligações ou mensagens de vendedores',
                ],
            },
            {
                title: 'Cartões de Crédito e Tarifas Abusivas',
                description: 'Muitos bancos cobram tarifas que não foram contratadas, seguros não solicitados e juros rotativos abusivos nas faturas do cartão de crédito. Essas cobranças indevidas podem ser contestadas e os valores restituídos.',
                qualifications: [
                    'Ter cobrança de anuidade ou tarifa não prevista em contrato',
                    'Ter seguro prestamista ou proteção financeira cobrado sem autorização',
                    'Estar pagando juros rotativos acima da taxa média de mercado',
                    'Ter cobrança de serviços opcionais que não foram solicitados',
                ],
                documents: [
                    'Faturas do cartão de crédito dos últimos 12 meses',
                    'Contrato de adesão ao cartão de crédito',
                    'Extratos bancários que mostrem os débitos',
                    'Documentos pessoais e comprovante de residência',
                ],
                proofs: [
                    'Prints das faturas identificando cobranças indevidas',
                    'E-mails ou correspondências do banco sobre os serviços',
                    'Registro de reclamação no SAC ou ouvidoria do banco',
                    'Comparativo de taxas com outros bancos (para juros abusivos)',
                ],
            },
            {
                title: 'Golpes e Fraudes Bancárias',
                description: 'O banco tem o dever de garantir a segurança das operações financeiras. Se você foi vítima de golpe via PIX, clonagem de cartão, transferências não autorizadas ou acesso indevido Á  conta, o banco pode ser responsabilizado e obrigado a devolver os valores.',
                qualifications: [
                    'Ter sofrido transferência PIX não autorizada ou sob coação',
                    'Ter sido vítima de clonagem de cartão de crédito ou débito',
                    'Ter tido a conta bancária invadida com saques ou empréstimos não reconhecidos',
                    'Ter caído em golpe por falha de segurança do aplicativo ou sistema bancário',
                ],
                documents: [
                    'Extratos bancários mostrando as transações fraudulentas',
                    'Boletim de ocorrência detalhando o golpe',
                    'Prints de mensagens ou e-mails do golpista (se houver)',
                    'Documentos pessoais e comprovante de residência',
                ],
                proofs: [
                    'Prints do aplicativo mostrando movimentações não reconhecidas',
                    'Protocolo de contestação junto ao banco',
                    'Resposta do banco negando a devolução (se houver)',
                    'Horários e datas das transações comparados com sua localização',
                ],
            },
        ],
        whatsappNumber: '5592999999999',
        whatsappMessage: 'Olá! Gostaria de uma consulta sobre Direito Bancário.',
    },
    consumidor: {
        title: 'Direito do Consumidor',
        subtitle: 'Advogado especialista em Direito do Consumidor em Manaus. Ações contra concessionárias, operadoras e grandes empresas no Amazonas.',
        heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop',
        intro: 'Você está com problemas com conta de luz cara demais, falta de água, internet que não funciona ou nome sujo no SPC sem motivo? Nosso escritório de advocacia em Manaus é especializado em resolver esses problemas. Atuamos com ações judiciais contra a Amazonas Energia, Águas de Manaus, operadoras como Claro, Vivo, TIM, Oi e SKY, e outras empresas que desrespeitam o consumidor. Se você passa por alguma dessas situações, fale conosco para uma consulta gratuita:',
        benefits: [
            {
                title: 'Conta de Luz Abusiva',
                subtitle: 'Advogado contra a Amazonas Energia em Manaus. Cobrança por estimativa, conta de luz cara e aparelhos queimados.',
                description: 'Sua conta de luz veio muito cara e você não sabe por quê? A Amazonas Energia é a empresa com mais reclamações no Amazonas. Milhares de consumidores em Manaus recebem contas de energia com valores absurdos, cobradas por estimativa, sem leitura real do relógio. Além disso, quedas de energia e apagões constantes queimam aparelhos e causam prejuízo. Se isso acontece com você, saiba que a lei garante o direito de pedir a devolução do dinheiro pago a mais, indenização por aparelhos queimados e até danos morais.',
                qualifications: [
                    'Sua conta de luz veio com valor absurdo, muito acima do que você realmente consome',
                    'A Amazonas Energia cobrou por estimativa, sem fazer a leitura real do medidor',
                    'Seus aparelhos queimaram por causa de queda de energia ou oscilação na rede elétrica',
                    'Você ficou sem energia por horas ou dias sem aviso prévio e sem explicação',
                    'Cortaram sua luz mesmo com a conta paga ou por dívida que não é sua',
                ],
                documents: [
                    'Últimas contas de luz da Amazonas Energia (pelo menos dos últimos 6 meses)',
                    'Comprovantes de pagamento das contas que você está contestando',
                    'Protocolo de reclamação feita na Amazonas Energia, ANEEL ou Procon Manaus',
                    'RG, CPF e comprovante de endereço atualizado',
                ],
                proofs: [
                    'Fotos ou vídeos mostrando a falta de energia ou oscilação na sua casa',
                    'Prints de reclamações que você fez no Reclame Aqui, redes sociais ou site da empresa',
                    'Nota fiscal dos aparelhos que queimaram por causa da energia',
                    'Laudo de técnico ou eletricista confirmando que o dano foi causado pela rede elétrica',
                ],
            },
            {
                title: 'Problemas com Água e Esgoto',
                subtitle: 'Advogado contra a Águas de Manaus. Falta de água, conta de água alta e cobrança de esgoto indevida.',
                description: 'Está sem água em casa há dias e ninguém resolve? Recebeu uma conta de água com valor que não faz sentido? Está pagando tarifa de esgoto mas no seu bairro nem tem rede de esgoto? A Águas de Manaus é uma das empresas mais reclamadas da cidade. Se você sofre com falta de água constante, cobrança por consumo que não corresponde à realidade ou taxa de esgoto em área sem saneamento, você tem direito a pedir seu dinheiro de volta e ainda receber indenização.',
                qualifications: [
                    'Ficou sem água em casa por dias sem nenhum aviso da Águas de Manaus',
                    'Recebeu conta de água com valor muito alto, sem condizer com seu consumo real',
                    'Está pagando tarifa de esgoto mas no seu bairro não tem rede de esgoto tratado',
                    'Tiveram a água cortada na sua casa sem motivo ou por dívida que já foi paga',
                    'Estão cobrando por vazamento na rua, que é responsabilidade da empresa e não sua',
                ],
                documents: [
                    'Últimas contas de água da Águas de Manaus (pelo menos dos últimos 6 meses)',
                    'Comprovantes de pagamento das contas de água em dia',
                    'Protocolo de reclamação na Águas de Manaus, ARSAM ou Procon Manaus',
                    'RG, CPF e comprovante de endereço atualizado',
                ],
                proofs: [
                    'Foto do relógio de água mostrando o consumo real registrado',
                    'Fotos ou vídeos mostrando a falta de água ou pressão baixa na torneira',
                    'Foto mostrando que no seu bairro não existe rede de esgoto',
                    'Prints de reclamações e protocolos de atendimento da Águas de Manaus',
                ],
            },
            {
                title: 'Energia, Água e Internet que Nunca Funcionam Direito',
                subtitle: 'Falhas constantes de luz, água ou internet no seu bairro em Manaus. Seus direitos quando o serviço sempre falha.',
                description: 'Não é uma falha de vez em quando, é todo dia a mesma coisa? Se no seu bairro a energia cai toda semana, a água some com frequência ou a internet nunca funciona como deveria, isso não é normal. Quando o problema é recorrente e afeta várias pessoas na mesma região de Manaus, estamos diante de uma falha grave e sistemática. Nosso escritório entra com ações judiciais para que todos os moradores prejudicados sejam indenizados pela empresa responsável.',
                qualifications: [
                    'No seu bairro a energia cai toda hora, a água falta sempre ou a internet nunca funciona direito',
                    'Você já reclamou várias vezes na empresa mas o problema nunca é resolvido de verdade',
                    'A empresa não dá retorno, não cumpre prazos e trata você com descaso',
                    'Seus vizinhos e moradores da mesma rua sofrem com o mesmo problema que você',
                    'Você já fez reclamação no Procon, Reclame Aqui e mesmo assim nada foi resolvido',
                ],
                documents: [
                    'Todas as suas contas e comprovantes de pagamento do serviço (luz, água ou internet)',
                    'Todos os protocolos de reclamação que você abriu na empresa e nos órgãos reguladores',
                    'Reclamações registradas no Procon Manaus, Reclame Aqui ou ouvidoria da empresa',
                    'RG, CPF e comprovante de endereço atualizado',
                ],
                proofs: [
                    'Todos os protocolos de reclamação que você abriu ao longo dos meses (mostrando que o problema se repete)',
                    'Fotos e vídeos gravados ao longo do tempo mostrando as falhas do serviço',
                    'Relatos de vizinhos ou moradores do seu bairro que sofrem com o mesmo problema',
                    'Prints de reclamações no Reclame Aqui, redes sociais e ouvidorias contra a empresa',
                ],
            },
            {
                title: 'Nome Sujo no SPC ou Serasa Indevido',
                subtitle: 'Advogado para limpar nome no SPC e Serasa em Manaus. Cobrança indevida, dívida que não existe e negativação injusta.',
                description: 'Descobriu que seu nome está sujo no SPC ou Serasa por uma dívida que você não fez? Já pagou a conta mas a empresa não tirou a restrição? Estão cobrando uma dívida antiga de mais de 5 anos? Se você mora em Manaus ou no Amazonas e está com o nome negativado sem motivo, você tem direito a receber indenização por danos morais, ter seu nome limpo imediatamente e ainda receber em dobro o valor que foi cobrado errado. Nosso escritório resolve isso.',
                qualifications: [
                    'Seu nome foi parar no SPC ou Serasa por uma dívida que você não reconhece e não é sua',
                    'A empresa continua cobrando por um serviço que você já cancelou há tempo',
                    'Você já pagou a dívida mas a empresa não tirou seu nome do SPC/Serasa',
                    'Estão cobrando uma dívida com mais de 5 anos, que já prescreveu e não pode mais ser cobrada',
                    'Você não consegue fazer compras, financiamento ou crédito porque uma empresa sujou seu nome sem razão',
                ],
                documents: [
                    'Consulta recente ao SPC ou Serasa mostrando a negativação no seu nome',
                    'Comprovante de pagamento da dívida (se você já pagou e mesmo assim não tiraram seu nome)',
                    'Protocolo de cancelamento do serviço (se a dívida é de um serviço que você já cancelou)',
                    'RG, CPF e comprovante de endereço atualizado',
                ],
                proofs: [
                    'Print da tela do SPC ou Serasa mostrando o seu nome negativado',
                    'Comprovante de pagamento, recibo de cancelamento ou qualquer prova de que a dívida não existe',
                    'Prints das suas reclamações pedindo para tirar a negativação',
                    'Provas dos prejuízos que você teve por causa do nome sujo (crédito negado, financiamento recusado, compra impedida)',
                ],
            },
            {
                title: 'Indenização por Danos Morais',
                subtitle: 'Advogado para pedir indenização contra empresas em Manaus. Constrangimento, descaso e prejuízo causado por concessionárias.',
                description: 'Ficou sem luz por dias e perdeu toda a comida da geladeira? Cortaram sua água sem motivo e você passou vergonha? Uma empresa te tratou com desrespeito e descaso? Quando a Amazonas Energia, Águas de Manaus, ou operadoras como Claro, Vivo, TIM e Oi causam transtornos que vão além do aceitável, você tem o direito de pedir indenização por danos morais. Quanto maior o prejuízo e o porte da empresa, maior o valor da indenização que você pode receber.',
                qualifications: [
                    'Cortaram sua luz, água ou telefone sem motivo e você passou por constrangimento',
                    'Ficou sem energia ou água por muito tempo e isso prejudicou sua rotina, seu trabalho ou sua saúde',
                    'Você teve prejuízo financeiro real por causa da falha da empresa (comida estragou, perdeu dia de trabalho, equipamento quebrou)',
                    'A empresa te tratou com desrespeito, descaso ou discriminação no atendimento',
                    'Você tentou resolver o problema várias vezes e a empresa simplesmente ignorou',
                ],
                documents: [
                    'RG, CPF e comprovante de endereço atualizado',
                    'Contas e contratos que comprovem que você é cliente da empresa',
                    'Protocolos de reclamação no SAC da empresa, Procon Manaus ou Reclame Aqui',
                    'Documentos que comprovem os prejuízos que você sofreu (notas fiscais, laudos, atestados médicos)',
                ],
                proofs: [
                    'Fotos e vídeos mostrando a situação de transtorno que você viveu',
                    'Atestados médicos ou laudos psicológicos (se a situação afetou sua saúde)',
                    'Testemunhas que viram o que aconteceu com você',
                    'Boletim de ocorrência (se a situação foi grave o suficiente para registrar na polícia)',
                ],
            },
            {
                title: 'Ação de Busca e Apreensão de Veículos',
                description: 'Se você atrasou parcelas do financiamento do seu veículo, o banco pode entrar com ação de busca e apreensão. Porém, muitas vezes essa ação é irregular, e existem defesas que podem manter o veículo com você e revisar o contrato.',
                qualifications: [
                    'Ter recebido notificação de busca e apreensão do veículo financiado',
                    'Estar com parcelas atrasadas no financiamento do veículo',
                    'Não ter recebido notificação extrajudicial prévia (requisito obrigatório)',
                    'Suspeitar que o contrato possui cláusulas abusivas ou juros excessivos',
                ],
                documents: [
                    'Contrato de financiamento do veículo',
                    'Comprovantes de pagamento das parcelas (pagas e atrasadas)',
                    'Documento do veículo (CRLV)',
                    'Notificação de busca e apreensão (se recebeu)',
                ],
                proofs: [
                    'Tabela Price do financiamento mostrando a evolução das parcelas',
                    'Ausência de notificação extrajudicial (no cartório de títulos)',
                    'Comprovante de endereço atualizado',
                    'Demonstrativo do valor já pago vs. valor total financiado',
                ],
            },
            {
                title: 'Negativação Indevida (SPC/Serasa)',
                description: 'Ter o nome negativado sem motivo causa constrangimento e impede o acesso a crédito. Essa é uma das violações mais graves ao consumidor e gera direito a indenização por danos morais, além da exclusão do apontamento.',
                qualifications: [
                    'Ter o nome inscrito no SPC/Serasa por dívida que não é sua',
                    'Ter sido negativado por dívida já paga ou prescrita',
                    'Ter sido negativado sem comunicação prévia obrigatória',
                    'Ter sido vítima de fraude com uso indevido de seus documentos',
                ],
                documents: [
                    'Consulta ao SPC/Serasa mostrando a negativação',
                    'Comprovantes de pagamento da dívida (se já foi paga)',
                    'Documentos pessoais: RG, CPF e comprovante de residência',
                    'Contrato original da suposta dívida (se possuir)',
                ],
                proofs: [
                    'Print do aplicativo Serasa ou carta de negativação recebida',
                    'Recibos ou comprovantes bancários de pagamento',
                    'Registro de reclamação junto ao Procon',
                    'Boletim de ocorrência (em caso de fraude/uso indevido de documentos)',
                ],
            },
        ],
        whatsappNumber: '5592982926890',
        whatsappMessage: 'Olá! Gostaria de uma consulta sobre Direito do Consumidor.',
    },
};

// Mapeamento de slugs SEO-friendly para chaves internas
const slugMap: Record<string, string> = {
    'previdenciario': 'previdenciario',
    'bancario': 'bancario',
    'consumidor': 'consumidor',
    // Manaus
    'advogado-previdenciario-manaus': 'previdenciario',
    'advogado-bancario-manaus': 'bancario',
    'advogado-consumidor-manaus': 'consumidor',
    // Maués
    'advogado-previdenciario-maues': 'previdenciario',
    'advogado-bancario-maues': 'bancario',
    'advogado-consumidor-maues': 'consumidor',
    // Nova Olinda do Norte
    'advogado-previdenciario-nova-olinda-do-norte': 'previdenciario',
    'advogado-bancario-nova-olinda-do-norte': 'bancario',
    'advogado-consumidor-nova-olinda-do-norte': 'consumidor',
    // Careiro
    'advogado-previdenciario-careiro': 'previdenciario',
    'advogado-bancario-careiro': 'bancario',
    'advogado-consumidor-careiro': 'consumidor',
};

// Nome da cidade a partir do slug
const cityFromSlug = (s: string): string => {
    if (s.includes('maues')) return 'Maués';
    if (s.includes('nova-olinda')) return 'Nova Olinda do Norte';
    if (s.includes('careiro')) return 'Careiro';
    return 'Manaus';
};

const areaLabel: Record<string, string> = {
    'previdenciario': 'Previdenciário',
    'bancario': 'Bancário',
    'consumidor': 'do Consumidor',
};

const AreaDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const pathname = window.location.pathname.replace(/^\//, '');

    // Resolver slug: pode vir do useParams (/areas/:slug) ou da URL direta
    const lookupKey = slug || pathname;
    const resolvedSlug = slugMap[lookupKey] || lookupKey;
    const area = areasData[resolvedSlug] || null;
    const city = cityFromSlug(lookupKey);
    const { open: openWhatsApp } = useWhatsAppModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (resolvedSlug && areaLabel[resolvedSlug]) {
            document.title = `Advogado ${areaLabel[resolvedSlug]} em ${city} | Fonseca & Miranda Advocacia`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', `Advogado especialista em Direito ${areaLabel[resolvedSlug]} em ${city}, Amazonas. Consulta gratuita. Fonseca & Miranda Advocacia.`);
            }
        }
    }, [slug, resolvedSlug, city]);

    if (!area) {
        return (
            <div className="min-h-screen bg-[#f9f5f1] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Área não encontrada</h1>
                    <Link to="/" className="text-[#4A7BFF] hover:underline">Voltar Á  página inicial</Link>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen selection:bg-[#f5a623] selection:text-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#0d1023] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={area.heroImage} alt={area.title} className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1023]/80 to-[#0d1023]"></div>
                </div>
                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <FadeIn direction="up">
                        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                            Voltar Á  Página Inicial
                        </Link>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Áreas de Atuação
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                            {area.title}
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                            {area.subtitle}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Intro */}
            <section className="py-16 md:py-20 px-4 bg-[#f9f5f1]">
                <div className="max-w-5xl mx-auto">
                    <FadeIn direction="up">
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl">
                            {area.intro}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Detailed Benefits */}
            {area.benefits.map((benefit, idx) => (
                <section key={idx} className={`py-16 md:py-24 px-4 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f5f1]'}`}>
                    <div className="max-w-5xl mx-auto">
                        <FadeIn direction="up">
                            {/* Benefit Header */}
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-[#4A7BFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-[#4A7BFF] text-lg font-bold">{String(idx + 1).padStart(2, '0')}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                                        {benefit.title}
                                    </h2>
                                    {benefit.subtitle && (
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                            {benefit.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 pl-0 md:pl-16">
                                {benefit.description}
                            </p>
                        </FadeIn>

                        {/* 3-Column Detail Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 md:pl-16">
                            {/* Qualifications */}
                            <FadeIn direction="up" delay={100}>
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <polyline points="16 11 18 13 22 9" />
                                            </svg>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quem se qualifica?</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {benefit.qualifications.map((q, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[13px] leading-relaxed">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {q}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Documents */}
                            <FadeIn direction="up" delay={200}>
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                                <line x1="10" y1="9" x2="8" y2="9" />
                                            </svg>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Documentos necessários</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {benefit.documents.map((d, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[13px] leading-relaxed">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Proofs */}
                            <FadeIn direction="up" delay={300}>
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                                <line x1="12" y1="9" x2="12" y2="13" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Comprovações</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {benefit.proofs.map((p, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[13px] leading-relaxed">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Per-benefit CTA */}
                        <FadeIn direction="up" delay={400}>
                            <div className="mt-10 pl-0 md:pl-16 bg-gradient-to-r from-[#4A7BFF]/5 to-transparent rounded-2xl p-6 md:p-8 border border-[#4A7BFF]/10">
                                <p className="text-gray-700 text-base leading-relaxed mb-4">
                                    <strong>Se identificou com essa situação?</strong> Clique abaixo e vamos analisar seu caso juntos. Nossa equipe está pronta para orientá-lo.
                                </p>
                                <button
                                    onClick={openWhatsApp}
                                    className="group inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-green-600 transition-all shadow-md shadow-green-500/20"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Fale Conosco pelo WhatsApp
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            ))}

            {/* Final CTA */}
            <section className="py-20 md:py-28 px-4 bg-gray-50 relative overflow-hidden">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <FadeIn direction="up">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
                            Não encontrou sua situação?
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                            Cada caso é único. Entre em contato pelo WhatsApp e nossa equipe fará uma análise gratuita e personalizada da sua situação.
                        </p>
                        <button
                            onClick={openWhatsApp}
                            className="group inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Conversar pelo WhatsApp
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AreaDetailPage;
