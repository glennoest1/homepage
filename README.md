# Website Transit Navigation

Landing page dieu huong link cho he thong "Transit Navigation", gom backend Spring Boot va frontend React/Vite/Tailwind trong cung mot repository.

## Tong Quan

- Frontend: React functional components, Vite, Tailwind CSS, Lucide React.
- Backend: Java 17, Spring Boot 3, Spring Web MVC, Spring Data JPA, H2 in-memory database.
- Database seed: `schema.sql` tao bang `entrances`, `data.sql` nap san 4 entrance mac dinh.
- Dev script: `run-dev.sh` doc `.env`, chay dong thoi frontend va backend, hien thi log realtime, luu port/PID/URL vao `.logs/`.

## Cau Truc Thu Muc

```text
.
|-- backend/
|   |-- pom.xml
|   `-- src/main/
|       |-- java/com/example/homepage/
|       |   |-- controller/NavigationController.java
|       |   |-- entity/Entrance.java
|       |   |-- repository/EntranceRepository.java
|       |   `-- service/
|       `-- resources/
|           |-- application.yml
|           |-- schema.sql
|           `-- data.sql
|-- frontend/
|   |-- package.json
|   |-- vite.config.js
|   `-- src/
|       |-- components/
|       |-- data/
|       |-- hooks/
|       |-- lib/
|       |-- main.jsx
|       `-- styles.css
|-- .env
|-- .env.example
|-- run-dev.sh
`-- README.md
```

## Yeu Cau Moi Truong

- Java 17 hoac 21. Project da duoc kiem thu voi JDK 17.
- Maven 3.9.x, hoac Maven wrapper/cache co san tren may.
- Node.js va npm.
- Bash de chay `run-dev.sh` tren Windows/Git Bash/WSL.

Luu y: May hien tai co JDK 25 mac dinh, Lombok co the loi compile voi JDK nay. Nen dung JDK 17/21 khi chay backend.

## Chay Nhanh Ca Frontend Va Backend

```bash
./run-dev.sh
```

Mac dinh:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- API active links: `http://localhost:8080/api/v1/navigation/active-links`

Script se:

- Chay Spring Boot backend.
- Chay Vite frontend.
- Hien thi log realtime voi prefix `[backend]` va `[frontend]`.
- Ghi log vao `.logs/backend.dev.log` va `.logs/frontend.dev.log`.
- Ghi metadata runtime vao `.logs/dev-servers.env` va `.logs/dev-servers.json`.
- Dung ca hai process khi bam `Ctrl+C`.

## Cau Hinh .env

Project co san `.env` de chay local va `.env.example` de tham khao/copy sang moi truong khac.
Bien moi truong truyen truc tiep khi chay se uu tien hon gia tri trong `.env`.

```env
BACKEND_HOST=localhost
BACKEND_PORT=8080
FRONTEND_HOST=localhost
FRONTEND_PORT=5173
VITE_BACKEND_URL=http://localhost:8080
JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot"
MAVEN_CMD="C:/Users/CYBORG/.m2/wrapper/dists/apache-maven-3.9.16/0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0/bin/mvn.cmd"
NPM_CMD=npm
```

Neu may da co `mvn` trong `PATH`, co the dat:

```env
MAVEN_CMD=mvn
```

`VITE_BACKEND_URL` duoc Vite dung de proxy `/api` ve backend. Script se export lai gia tri nay theo `BACKEND_HOST` va `BACKEND_PORT` khi chay e2e.

## Luu Va Doc Port/PID

Moi lan `run-dev.sh` chay, script ghi lai port, PID, URL va log path cua lan chay gan nhat.

Doc bang Bash:

```bash
cat .logs/dev-servers.env
cat .logs/dev-servers.json
```

Doc bang PowerShell:

```powershell
Get-Content .logs/dev-servers.env
Get-Content .logs/dev-servers.json
```

Vi du noi dung `.logs/dev-servers.env`:

```env
STATUS=running
BACKEND_PORT=8080
BACKEND_PID=12345
BACKEND_URL=http://localhost:8080
BACKEND_API_URL=http://localhost:8080/api/v1/navigation/active-links
BACKEND_LOG=/path/to/.logs/backend.dev.log
FRONTEND_PORT=5173
FRONTEND_PID=12346
FRONTEND_URL=http://localhost:5173
FRONTEND_LOG=/path/to/.logs/frontend.dev.log
```

## Doi Port Khi Chay

```bash
BACKEND_PORT=8081 FRONTEND_PORT=5174 ./run-dev.sh
```

Khi chay bang `run-dev.sh`, script tu dat `VITE_BACKEND_URL` theo `BACKEND_PORT`, nen frontend proxy `/api` dung backend port moi.

## Chay Rieng Backend

Bash:

```bash
cd backend
export JAVA_HOME="/c/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot"
export PATH="$JAVA_HOME/bin:$PATH"
mvn spring-boot:run
```

PowerShell:

```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
mvn spring-boot:run
```

Backend chay tai `http://localhost:8080`.

## Chay Rieng Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chay tai `http://localhost:5173`.

## API

### Lay danh sach entrance dang active

```http
GET /api/v1/navigation/active-links
```

Vi du:

```bash
curl http://localhost:8080/api/v1/navigation/active-links
```

Response la danh sach `Entrance` sap xep theo `priority` tang dan.

### Ghi log click

```http
POST /api/v1/navigation/click-log?entranceId=1
```

Vi du:

```bash
curl -X POST "http://localhost:8080/api/v1/navigation/click-log?entranceId=1"
```

Backend log ra console:

```text
User clicked on entrance ID: 1
```

## Database

Project dung H2 in-memory database:

- JDBC URL: `jdbc:h2:mem:transit_navigation`
- H2 Console: `http://localhost:8080/h2-console`
- Username: `sa`
- Password: de trong

Schema chinh:

```sql
CREATE TABLE entrances (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    target_url VARCHAR(512) NOT NULL,
    icon_type VARCHAR(50) DEFAULT 'home',
    priority INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Du lieu seed nam trong `backend/src/main/resources/data.sql`.

## Build Va Test

Frontend production build:

```bash
cd frontend
npm run build
```

Backend test voi JDK 17:

```bash
cd backend
export JAVA_HOME="/c/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot"
export PATH="$JAVA_HOME/bin:$PATH"
mvn test
```

PowerShell:

```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
mvn test
```

## Kiem Thu Nhanh

Sau khi chay `./run-dev.sh`:

```bash
curl http://localhost:8080/api/v1/navigation/active-links
curl -X POST "http://localhost:8080/api/v1/navigation/click-log?entranceId=1"
curl http://localhost:5173
```

Ky vong:

- API active links tra ve 4 rows tu `data.sql`.
- Click-log tra ve HTTP 200.
- Frontend tra ve HTML cua Vite app.

## Troubleshooting

### Port 8080 hoac 5173 da duoc dung

Dung port khac:

```bash
BACKEND_PORT=8081 FRONTEND_PORT=5174 ./run-dev.sh
```

Hoac tim process dang giu port tren Windows:

```powershell
netstat -ano | Select-String ":8080"
netstat -ano | Select-String ":5173"
```

### Lombok compile loi voi JDK 25

Dung JDK 17 hoac 21. Project da duoc test voi JDK 17.

### npm.ps1 bi PowerShell chan

Dung `npm.cmd` hoac chay qua Bash/Git Bash:

```powershell
& "C:\Program Files\node-v24.13.1-win-x64\npm.cmd" run build
```

### Xem log runtime

```bash
tail -f .logs/backend.dev.log
tail -f .logs/frontend.dev.log
```

PowerShell:

```powershell
Get-Content .logs/backend.dev.log -Wait
Get-Content .logs/frontend.dev.log -Wait
```
