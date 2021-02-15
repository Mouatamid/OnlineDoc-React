node {
    def deployPath = "/home/fahd_arh/jenkins/deploy"

    stage('Checkout'){
        checkout scm
    }

    stage('Build'){
        sh 'sudo npm install'
        sh 'sudo npm run build'
    }

    stage('Deployment'){
        sh "sudo rm -rf ${deployPath}/react/ 2>/dev/null"
        sh "sudo cp -r build ${deployPath}/react 2>/dev/null"
    }
}