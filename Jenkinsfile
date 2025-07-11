pipeline {
    agent { label "dev-server" }
    stages {
        stage("Code Clone") {
            steps {
                git url: "https://github.com/arham3117/Movie-collection-app.git", branch: "two-tier"
            }
        }
        stage("Code Build & Test") {
            steps {
                sh "docker build -t movie-db-app ."
            }
        }
        stage("Push to DockerHub") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "dockerhubcreds", 
                    usernameVariable: "dockerhubUser", 
                    passwordVariable: "dockerhubPass")]) {
                    sh "echo ${env.dockerhubPass} | docker login -u ${env.dockerhubUser} --password-stdin"
                    sh "docker image tag movie-db-app:latest ${env.dockerhubUser}/movie-db-app:latest"
                    sh "docker push ${env.dockerhubUser}/movie-db-app:latest"
                }
            }
        }
        stage("Deploy") {
            steps {
                sh "docker compose down && docker compose up -d --build"
            }
        }
    }
}