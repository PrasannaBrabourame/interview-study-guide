// Interview topic data: 207 entries, one object per topic.
const topics = [
  {
    "id": "headless",
    "title": "Kubernetes Headless Service",
    "category": "Kubernetes",
    "question": "What is a Kubernetes Headless Service? How is it different from a normal ClusterIP Service, and when would you use it?",
    "technical": [
      "A normal Service has a stable virtual IP and load-balances traffic across ready Pods.",
      "A Headless Service uses <code>clusterIP: None</code>. Kubernetes does not create the normal virtual Service IP.",
      "DNS returns individual Pod endpoint addresses, allowing clients to discover or connect to a specific Pod."
    ],
    "layman": "A normal Service is a company’s main telephone number. A Headless Service gives callers the direct numbers of individual employees.",
    "usecases": [
      "StatefulSet discovery",
      "Kafka, Cassandra and Elasticsearch clusters",
      "Primary/replica databases",
      "Peer-to-peer distributed systems"
    ],
    "code": "apiVersion: v1\nkind: Service\nmetadata:\n  name: database-service\nspec:\n  clusterIP: None\n  selector:\n    app: database\n  ports:\n    - port: 5432\n      targetPort: 5432",
    "followups": [
      "Does it perform normal Service load balancing?",
      "Why is it often used with StatefulSets?",
      "What DNS records are returned?"
    ],
    "redflags": [
      "Says it exposes Pods directly to the internet",
      "Cannot explain clusterIP: None",
      "Says it means a Service without Pods"
    ],
    "memory": "Headless = no virtual Service IP; DNS exposes individual Pod endpoints."
  },
  {
    "id": "services",
    "title": "Kubernetes Service Definitions",
    "category": "Kubernetes",
    "question": "What is a Kubernetes Service, and what Service types are available?",
    "technical": [
      "Pods are replaceable and their IP addresses change. A Service gives a stable network identity to Pods selected by labels.",
      "<strong>ClusterIP</strong> is internal-only. <strong>NodePort</strong> opens a port on every node. <strong>LoadBalancer</strong> provisions a cloud load balancer. <strong>ExternalName</strong> creates a DNS alias.",
      "<code>port</code> is the Service-facing port; <code>targetPort</code> is the application port on the Pod."
    ],
    "layman": "Pods are employees who change desks. A Service is the permanent reception number that stays unchanged.",
    "usecases": [
      "Internal microservice discovery",
      "Public or private load-balanced TCP services",
      "Temporary NodePort testing",
      "External DNS alias"
    ],
    "code": "apiVersion: v1\nkind: Service\nmetadata:\n  name: subscription-api\nspec:\n  type: ClusterIP\n  selector:\n    app: subscription-api\n  ports:\n    - port: 80\n      targetPort: 8080",
    "followups": [
      "Difference between port and targetPort?",
      "What if the selector is wrong?",
      "Service versus Ingress?"
    ],
    "redflags": [
      "Says a Service creates Pods",
      "Uses NodePort as the default public endpoint",
      "Cannot explain labels and selectors"
    ],
    "memory": "Service = stable endpoint in front of replaceable Pods."
  },
  {
    "id": "pipeline",
    "title": "Production Delivery Pipeline",
    "category": "DevOps",
    "question": "Design a production-grade delivery pipeline from source-code commit to production deployment.",
    "technical": [
      "Validate code through pull-request review, linting, unit, integration and contract tests.",
      "Run static security analysis, dependency, secret, licence, infrastructure and container-image scans, and generate an SBOM.",
      "Build one immutable artefact and promote the same artefact through environments.",
      "Use backward-compatible database migrations, controlled rollout, health verification and automated rollback thresholds."
    ],
    "layman": "A delivery pipeline is a factory line. Every product passes quality and safety checks before customers receive it.",
    "usecases": [
      "Cloud Build to Artifact Registry",
      "Canary or blue-green deployment to GKE or Cloud Run",
      "Terraform plan review",
      "Automated rollback on SLO breach"
    ],
    "code": "Commit\n  -> Pull request checks\n  -> Tests and security scans\n  -> Build immutable image\n  -> Push to Artifact Registry\n  -> Deploy to test\n  -> Smoke and integration tests\n  -> Canary production deployment\n  -> Promote or roll back",
    "followups": [
      "Why promote the same artefact?",
      "Where are secrets stored?",
      "How are database migrations handled?",
      "What triggers rollback?",
      "What if the application deploy succeeds but the database migration fails?",
      "How are production approvals controlled?"
    ],
    "redflags": [
      "Deployment from a developer laptop",
      "Secrets in pipeline YAML",
      "No rollback",
      "Different test and production builds"
    ],
    "memory": "Build once, test thoroughly, promote safely and verify continuously."
  },
  {
    "id": "routing",
    "title": "Kubernetes Routing",
    "category": "Kubernetes",
    "question": "Explain how traffic is routed from an external user to a Pod in Kubernetes.",
    "technical": [
      "A common route is user → DNS → cloud load balancer → Ingress or Gateway → Service → ready Pod → container.",
      "Layer 4 routing uses IP addresses and TCP/UDP ports. Layer 7 routing understands hostnames, URL paths, methods, headers and cookies.",
      "Internal services use Kubernetes DNS names, such as <code>payment-service.finance.svc.cluster.local</code>."
    ],
    "layman": "A parcel reaches the right city, building, department and finally an available employee.",
    "usecases": [
      "Host-based routing",
      "Path-based routing",
      "Canary routing",
      "Internal service discovery"
    ],
    "code": "Internet\n  -> DNS\n  -> HTTPS Load Balancer\n  -> Ingress / Gateway\n  -> Kubernetes Service\n  -> Ready Pod\n  -> Container port",
    "followups": [
      "Ingress versus Service?",
      "Where is TLS terminated?",
      "What if there are no ready endpoints?"
    ],
    "redflags": [
      "Confuses DNS and load balancing",
      "Cannot explain Layer 4 versus Layer 7",
      "Exposes every service publicly"
    ],
    "memory": "Routing narrows traffic from DNS to load balancer to route to Service to Pod."
  },
  {
    "id": "nodes",
    "title": "Kubernetes Nodes",
    "category": "Kubernetes",
    "question": "What is a Kubernetes node, and what responsibilities does it have?",
    "technical": [
      "A node is a worker machine, usually a VM in GKE, that runs Pods.",
      "The kubelet ensures assigned Pods run; the container runtime runs containers; networking components connect Pods and Services.",
      "Node pools group similar machines. Labels, affinity, taints and tolerations control workload placement.",
      "The cluster autoscaler adds nodes when Pods cannot be scheduled and removes underused nodes when safe."
    ],
    "layman": "A node is an apartment building. Pods are residents, and the control plane assigns them to buildings.",
    "usecases": [
      "High-CPU encoding pool",
      "GPU inference pool",
      "Spot pool for batch jobs",
      "Dedicated nodes for regulated workloads"
    ],
    "code": "Node pool: encoding-pool\nLabel: workload=encoding\nTaint: workload=encoding:NoSchedule\n\nEncoding Pods:\n- match the label\n- tolerate the taint",
    "followups": [
      "What happens when a node fails?",
      "Pod autoscaling versus node autoscaling?",
      "Why separate node pools?"
    ],
    "redflags": [
      "Says node and Pod are the same",
      "No understanding of requests",
      "Assumes nodes fix every bottleneck"
    ],
    "memory": "Node = worker machine; node pool = group of similar workers."
  },
  {
    "id": "pods",
    "title": "Kubernetes Pods",
    "category": "Kubernetes",
    "question": "What is a Pod, and why does Kubernetes deploy Pods rather than individual containers?",
    "technical": [
      "A Pod is Kubernetes’ smallest deployable unit and contains one or more tightly coupled containers.",
      "Containers share one IP, port namespace, mounted volumes and lifecycle; they communicate through localhost.",
      "Most Pods contain one main application container. Sidecars and init containers are used only for tightly related functions.",
      "Pods are temporary; important state should not rely on local Pod storage."
    ],
    "layman": "A Pod is an office room shared by a main worker and, sometimes, a closely related assistant.",
    "usecases": [
      "Stateless API replica",
      "Service-mesh sidecar",
      "Init container for startup preparation"
    ],
    "code": "Pod\n├── application container\n├── optional sidecar\n├── shared network\n├── shared volumes\n└── common lifecycle",
    "followups": [
      "Can two containers use the same port?",
      "Pod versus Deployment?",
      "What happens to local data after replacement?"
    ],
    "redflags": [
      "Treats a Pod as permanent",
      "Stores critical data locally",
      "Places unrelated applications together"
    ],
    "memory": "Pod = smallest temporary deployment unit, usually one application container."
  },
  {
    "id": "deployment",
    "title": "Deployment YAML Configuration",
    "category": "Kubernetes",
    "question": "Explain the important fields in a Kubernetes Deployment YAML. What production-grade settings should be present?",
    "technical": [
      "<code>replicas</code> defines Pod count. <code>selector</code> must match Pod-template labels. <code>strategy</code> controls rollout.",
      "Resource requests guide scheduling; limits cap usage. Readiness controls traffic; liveness detects a stuck process; startup protects slow starts.",
      "Use immutable images, a dedicated service account, non-root execution, no privilege escalation and graceful termination.",
      "A complete setup also needs Service, HPA, PodDisruptionBudget, NetworkPolicy, monitoring and external secret management."
    ],
    "layman": "Deployment YAML is an instruction sheet describing what to run, how many copies to keep and how to replace them safely.",
    "usecases": [
      "Three API replicas",
      "Zero-planned-downtime rolling update",
      "Health probes",
      "Controlled CPU and memory"
    ],
    "code": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: subscription-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: subscription-api\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxUnavailable: 0\n      maxSurge: 1\n  template:\n    metadata:\n      labels:\n        app: subscription-api\n    spec:\n      serviceAccountName: subscription-api\n      terminationGracePeriodSeconds: 30\n      containers:\n        - name: app\n          image: asia-docker.pkg.dev/project/app/subscription-api:1.4.2\n          resources:\n            requests:\n              cpu: 250m\n              memory: 256Mi\n            limits:\n              cpu: \"1\"\n              memory: 512Mi\n          readinessProbe:\n            httpGet:\n              path: /health/ready\n              port: 8080\n          livenessProbe:\n            httpGet:\n              path: /health/live\n              port: 8080\n          securityContext:\n            runAsNonRoot: true\n            allowPrivilegeEscalation: false",
    "followups": [
      "Why not use latest?",
      "Readiness versus liveness?",
      "Meaning of maxUnavailable: 0?",
      "How are secrets supplied?"
    ],
    "redflags": [
      "No resources",
      "Secrets in YAML",
      "Runs as root unnecessarily",
      "Cannot explain selector"
    ],
    "memory": "Deployment YAML defines desired replicas, rollout, resources, health and security."
  },
  {
    "id": "daemonset",
    "title": "DaemonSets",
    "category": "Kubernetes",
    "question": "What is a DaemonSet, and when should it be used?",
    "technical": [
      "A DaemonSet runs one Pod on every eligible node, or every node matching scheduling conditions.",
      "When a matching node joins, Kubernetes adds the DaemonSet Pod automatically.",
      "It is intended for node-level agents, not ordinary business application scaling."
    ],
    "layman": "A DaemonSet assigns one security guard to every building. New buildings automatically receive a guard.",
    "usecases": [
      "Logging agent",
      "Monitoring agent",
      "Security sensor",
      "Storage or network driver"
    ],
    "code": "apiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: log-agent\nspec:\n  selector:\n    matchLabels:\n      app: log-agent\n  template:\n    metadata:\n      labels:\n        app: log-agent\n    spec:\n      containers:\n        - name: agent\n          image: example/log-agent:2.1.0",
    "followups": [
      "What happens when a node is added?",
      "How do you target only GPU nodes?",
      "Risks of hostPath mounts?"
    ],
    "redflags": [
      "Uses DaemonSet for a normal API",
      "Says one Pod in the entire cluster",
      "Excessive host privileges"
    ],
    "memory": "DaemonSet = one node-level Pod on every eligible node."
  },
  {
    "id": "private-gke",
    "title": "Private GKE VPC Cluster",
    "category": "GCP",
    "question": "What is a private GKE cluster, and how would you design secure ingress, administration and internet egress?",
    "technical": [
      "Private GKE nodes use internal IP addresses and do not need public node IPs.",
      "Control-plane access should use a private endpoint or tightly restricted authorised networks.",
      "Cloud NAT provides controlled internet egress; Private Google Access supports Google APIs; Workload Identity replaces service-account keys.",
      "Public applications can still use an external HTTPS Load Balancer, Cloud Armor and GKE Ingress while nodes remain private."
    ],
    "layman": "The office has no doors opening directly to the street. Visitors use a guarded entrance and employees use a controlled exit.",
    "usecases": [
      "Regulated SaaS",
      "Banking and healthcare systems",
      "Private internal APIs",
      "Sensitive AI workloads"
    ],
    "code": "Internet users\n  -> External HTTPS Load Balancer\n  -> Cloud Armor\n  -> GKE Ingress / Gateway\n  -> Private GKE Pods\n\nAdministrators\n  -> Identity + MFA\n  -> VPN or IAP\n  -> Private control-plane endpoint\n\nPrivate nodes\n  -> Cloud NAT\n  -> Approved external services",
    "followups": [
      "How do nodes reach the internet?",
      "How do administrators reach the API?",
      "How do Pods access Secret Manager?"
    ],
    "redflags": [
      "Public IP on every node",
      "Permanent JSON keys",
      "Control plane open to all",
      "No egress control"
    ],
    "memory": "Private GKE keeps nodes private while controlled gateways handle ingress, admin and egress."
  },
  {
    "id": "bastion",
    "title": "Bastion Host",
    "category": "Security",
    "question": "What is a bastion host, and how should it be secured?",
    "technical": [
      "A bastion or jump host is a controlled administration entry point for private resources.",
      "Prefer Identity-Aware Proxy, OS Login, MFA and short-lived privileges; a public IP is often unnecessary.",
      "Use least privilege, strong patching, complete access logging, restricted network reach and no stored long-lived credentials.",
      "It is for administration, not normal application traffic."
    ],
    "layman": "A bastion is a guarded reception desk where visitors prove their identity before entering secure rooms.",
    "usecases": [
      "SSH to private VMs",
      "Emergency administration",
      "Controlled database troubleshooting"
    ],
    "code": "Administrator\n  -> Enterprise identity + MFA\n  -> Identity-Aware Proxy\n  -> Private bastion / VM\n  -> Approved internal resource",
    "followups": [
      "Does it require a public IP?",
      "How do you audit actions?",
      "What if it is compromised?"
    ],
    "redflags": [
      "SSH open to 0.0.0.0/0",
      "Shared SSH key",
      "Credentials stored on the host",
      "Used for application traffic"
    ],
    "memory": "Bastion = controlled administrative doorway, ideally identity-based and private."
  },
  {
    "id": "ship-logs",
    "title": "Shipping Logs",
    "category": "Observability",
    "question": "How would you ship application and Kubernetes logs to a central platform?",
    "technical": [
      "Applications normally emit structured logs to stdout and stderr. A node or platform agent forwards them to Cloud Logging or a SIEM.",
      "Agents include Google Cloud Ops Agent, Fluent Bit and OpenTelemetry Collector.",
      "Include service, version, severity, trace ID, safe tenant context, operation and error category. Redact secrets and sensitive data.",
      "Collectors should buffer and retry during temporary failure, but business requests should not fail merely because logging is unavailable."
    ],
    "layman": "Every branch writes a diary, and a courier sends all diaries to one central office.",
    "usecases": [
      "Trace one request across services",
      "Find errors by application version",
      "Monitor authentication failures"
    ],
    "code": "{\n  \"severity\": \"ERROR\",\n  \"service\": \"subscription-api\",\n  \"version\": \"1.4.2\",\n  \"traceId\": \"4ad7c98c\",\n  \"tenantId\": \"tenant-123\",\n  \"operation\": \"create-subscription\",\n  \"errorCode\": \"PAYMENT_TIMEOUT\",\n  \"durationMs\": 2450\n}",
    "followups": [
      "Why stdout?",
      "What if the logging platform fails?",
      "How do you prevent sensitive-data leakage?"
    ],
    "redflags": [
      "Logs only inside containers",
      "Logs passwords or tokens",
      "No correlation ID",
      "Logging failure breaks requests"
    ],
    "memory": "Write structured logs locally; agents reliably forward them centrally."
  },
  {
    "id": "central-logs",
    "title": "Centralised Log Monitoring",
    "category": "Observability",
    "question": "What is centralised log monitoring, and how is it different from simply storing logs?",
    "technical": [
      "Centralised monitoring combines logs from applications, infrastructure and environments in one controlled platform.",
      "Storage preserves records. Monitoring adds search, correlation, dashboards, alerting, retention, access control and incident integration.",
      "Alerts should indicate meaningful user or business impact and include severity, context, owner and runbook."
    ],
    "layman": "Keeping CCTV recordings is logging. A security team watching for unusual activity and raising alarms is monitoring.",
    "usecases": [
      "Alert on payment failure rate",
      "Compare errors by version",
      "Investigate tenant failures",
      "Detect suspicious login patterns"
    ],
    "code": "Good alert:\nSubscription creation failures > 5%\nfor 10 minutes\nand affected requests > 100\n\nPoor alert:\nOne ERROR log occurred",
    "followups": [
      "What makes an alert actionable?",
      "How do you avoid alert fatigue?",
      "How do logs relate to metrics and traces?"
    ],
    "redflags": [
      "Alerts on every exception",
      "No retention policy",
      "No collector monitoring",
      "Cannot distinguish logs, metrics and traces"
    ],
    "memory": "Central monitoring turns stored events into searchable evidence and actionable alerts."
  },
  {
    "id": "compute",
    "title": "Compute Engine Virtual Machines",
    "category": "GCP",
    "question": "What is Compute Engine, and when would you choose it instead of GKE, Cloud Run or Cloud Functions?",
    "technical": [
      "Compute Engine is Google Cloud’s IaaS VM platform. The customer controls the OS, software, machine type, disks and runtime configuration.",
      "Use it for legacy applications, vendor appliances, specialised OS or kernel requirements, lift-and-shift and workloads needing low-level machine control.",
      "For production, use managed instance groups, load balancing, health checks, autoscaling, instance templates, private IPs, Shielded VMs, OS Login, patching and backups.",
      "Prefer Cloud Run for stateless managed containers and GKE when Kubernetes orchestration is justified."
    ],
    "layman": "Compute Engine is an empty rented office you must furnish and maintain. Cloud Run is more like a serviced meeting room.",
    "usecases": [
      "Legacy enterprise application",
      "Vendor appliance",
      "Custom OS agent",
      "VM-controlled GPU workload"
    ],
    "code": "Compute Engine: full VM and OS control\nGKE: Kubernetes container platform\nCloud Run: serverless stateless containers\nCloud Functions: event-driven functions",
    "followups": [
      "What is a managed instance group?",
      "How do you make VMs highly available?",
      "When is Cloud Run better?"
    ],
    "redflags": [
      "One VM for a critical service",
      "No patch or backup process",
      "Overprivileged service account",
      "Uses VMs for everything"
    ],
    "memory": "Compute Engine = full VM control; prefer managed platforms when suitable."
  },
  {
    "id": "vpc",
    "title": "GCP vs AWS VPC Differences",
    "category": "Cloud Architecture",
    "question": "What are the key architectural differences between Google Cloud VPC and AWS VPC?",
    "technical": [
      "A Google Cloud VPC is global; its subnets are regional. One VPC can contain subnets across several regions.",
      "An AWS VPC is regional; its subnets are scoped to individual Availability Zones.",
      "AWS uses stateful Security Groups on interfaces and stateless subnet Network ACLs. GCP uses VPC firewall rules and hierarchical policies.",
      "GCP Shared VPC supports centrally managed networks across projects. AWS commonly uses shared VPC resources and Transit Gateway hub designs."
    ],
    "layman": "A GCP VPC can be one company network with offices in several regions. An AWS VPC is usually one regional company network connected to other regional networks.",
    "usecases": [
      "Global GCP Shared VPC",
      "Regional AWS VPCs connected through Transit Gateway",
      "Central network governance"
    ],
    "code": "GCP global VPC\n  ├── Singapore regional subnet\n  ├── Tokyo regional subnet\n  └── London regional subnet\n\nAWS\n  Singapore regional VPC\n  Tokyo regional VPC\n  London regional VPC\n  -> connect through peering / Transit Gateway",
    "followups": [
      "Is a GCP subnet global?",
      "Security Group versus NACL?",
      "Is peering transitive?",
      "How does NAT differ?"
    ],
    "redflags": [
      "Says both VPCs are global",
      "Says GCP subnet is global",
      "Confuses Security Group and NACL",
      "Assumes peering is transitive"
    ],
    "memory": "GCP VPC global and subnet regional; AWS VPC regional and subnet AZ-scoped."
  },
  {
    "id": "throughput",
    "title": "Designing for Highest Throughput",
    "category": "Performance",
    "question": "How would you design a system for high throughput? How is throughput different from latency?",
    "technical": [
      "Throughput is work completed per unit of time; latency is the duration of one operation.",
      "Increase throughput using horizontal scaling, partitioning, parallel processing, batching, queues, connection pooling, caching and efficient serialisation.",
      "Use bounded concurrency and backpressure. Unlimited concurrency can cause contention, retries, memory pressure and lower throughput.",
      "First find the real bottleneck: CPU, disk, network, database locks, connection limits, hot partitions or external rate limits."
    ],
    "layman": "Throughput is the number of cars passing through a toll plaza each hour. Latency is how long one car takes.",
    "usecases": [
      "Parallel media encoding",
      "Partitioned event consumers",
      "Batch writes",
      "Backlog-based autoscaling"
    ],
    "code": "Producer\n  -> partitioned durable queue\n  -> bounded parallel consumers\n  -> batch writes\n  -> backpressure\n  -> autoscaling using backlog age",
    "followups": [
      "Can more concurrency reduce throughput?",
      "What is backpressure?",
      "How do you maintain ordering?",
      "How do you locate the bottleneck?"
    ],
    "redflags": [
      "Only says add servers",
      "Confuses throughput and latency",
      "Unlimited concurrency",
      "Ignores downstream capacity"
    ],
    "memory": "Throughput = volume over time; optimise the real bottleneck with bounded parallelism."
  },
  {
    "id": "partitioning",
    "title": "BigQuery Partitioning and Clustering",
    "category": "Data",
    "question": "Explain partitioning and clustering in BigQuery. How are they different, and when would you use both?",
    "technical": [
      "Partitioning divides a table into segments, usually by date, timestamp, ingestion time or integer range. Queries can scan only relevant partitions.",
      "Clustering organises data within the table or partition by selected columns so BigQuery can skip irrelevant storage blocks.",
      "A common multi-tenant event design is partition by event date and cluster by tenant ID and event type.",
      "Choose fields from actual query patterns, require partition filters on large tables, monitor bytes scanned and use partition expiry for retention."
    ],
    "layman": "Partitioning puts books from each year in separate rooms. Clustering arranges the books inside each room by customer or subject.",
    "usecases": [
      "Date-partitioned audit logs",
      "Tenant and event-type clustering",
      "Retention through partition expiry",
      "Lower query cost"
    ],
    "code": "CREATE TABLE analytics.events\nPARTITION BY DATE(event_timestamp)\nCLUSTER BY tenant_id, event_type\nAS SELECT * FROM source_events;\n\nSELECT *\nFROM analytics.events\nWHERE DATE(event_timestamp) = '2026-07-28'\n  AND tenant_id = 'tenant-123'\n  AND event_type = 'SUBSCRIPTION_CREATED';",
    "followups": [
      "Why not partition by every tenant?",
      "What is partition pruning?",
      "How are late events handled?",
      "How do you enforce retention?"
    ],
    "redflags": [
      "Says it creates separate databases",
      "Ignores query patterns",
      "One partition per tenant by default",
      "Ignores bytes scanned"
    ],
    "memory": "Partition broadly, then cluster selectively inside each partition."
  },
  {
    "id": "validate-scale",
    "title": "Validate Claimed Production Scale",
    "category": "Candidate Validation",
    "question": "Your résumé states that you led backend engineering for a platform with more than 3 million daily active users. Describe the architecture, your personal ownership, peak traffic, latency targets, availability target and the most serious incident you handled.",
    "technical": [
      "Separate the scale of the full product from the services personally owned.",
      "Provide measurable values such as peak RPS, concurrency, p95/p99 latency, error rate, processing volume and unit cost.",
      "Explain topology, autoscaling, cache/CDN use, database limits, dependencies and incident controls.",
      "State which architecture and operational decisions were made personally and how improvement was verified."
    ],
    "layman": "Do not accept “the company had millions of users”. The candidate must explain exactly what they built and how they measured it.",
    "usecases": [
      "Validate real ownership of a high-scale media, subscription or recommendation service."
    ],
    "code": "Interview focus:\n- Scale claims require scope, metrics, failures and personal decisions.",
    "followups": [
      "What was the highest measured RPS?",
      "Which dashboard proved the SLO?",
      "What failed during peak traffic?"
    ],
    "redflags": [
      "No production numbers",
      "Attributes all scaling to Kubernetes",
      "Claims ownership of the entire platform without component detail"
    ],
    "memory": "Scale claims require scope, metrics, failures and personal decisions."
  },
  {
    "id": "legacy-migration",
    "title": "Legacy-to-Microservices Migration",
    "category": "Candidate Validation",
    "question": "Walk us through one legacy-to-microservices migration you led. How did you identify service boundaries, migrate data, control risk and prove the migration improved the system?",
    "technical": [
      "Start with a measurable business or operational problem, not a preference for microservices.",
      "Identify bounded contexts and business capabilities rather than technical layers.",
      "Use an incremental strangler approach, explicit contracts, feature flags and gradual traffic movement.",
      "Move towards service-owned data using outbox, CDC or controlled backfill; avoid uncontrolled shared-table access.",
      "Compare deployment frequency, lead time, change-failure rate, MTTR, latency, availability and cost before and after."
    ],
    "layman": "Renovate a building room by room while people continue using it, rather than demolishing everything in one day.",
    "usecases": [
      "Extract subscription management from a media monolith while old and new paths coexist."
    ],
    "code": "Interview focus:\n- A migration is successful only when business and engineering outcomes improve.",
    "followups": [
      "Why was each boundary chosen?",
      "How were cross-service transactions handled?",
      "What remained in the monolith?"
    ],
    "redflags": [
      "Containerised monolith called microservices",
      "Shared database without ownership",
      "No rollback or measured benefit"
    ],
    "memory": "A migration is successful only when business and engineering outcomes improve."
  },
  {
    "id": "gcp-ai-platform",
    "title": "Production-Grade AI Platform on GCP",
    "category": "AI & GenAI",
    "question": "Design a production-grade enterprise knowledge assistant on GCP for private client documents, cited answers and high concurrency.",
    "technical": [
      "Use an authenticated frontend and API layer on Cloud Run or GKE with tenant-aware authorisation.",
      "Ingest through Cloud Storage, asynchronous processing, parsing/OCR, chunking, embeddings and a vector index with metadata ACL filters.",
      "Use Vertex AI Gemini for grounded generation, citations and abstention when evidence is insufficient.",
      "Add Workload Identity, Secret Manager, encryption, Cloud Armor, VPC controls, observability, evaluation, audit and deletion.",
      "Version model, prompt, embeddings, chunking, index and evaluation dataset as one release configuration."
    ],
    "layman": "It is a secure company librarian that searches only the books you are allowed to read and shows exactly where the answer came from.",
    "usecases": [
      "Enterprise document assistant for policy and support knowledge."
    ],
    "code": "Interview focus:\n- RAG production design is retrieval, authorisation, evaluation and operations—not only an LLM call.",
    "followups": [
      "Where is document ACL enforced?",
      "How is prompt injection handled?",
      "How is a tenant deleted?"
    ],
    "redflags": [
      "Sends all documents to the model",
      "No tenant filter",
      "No evaluation or audit"
    ],
    "memory": "RAG production design is retrieval, authorisation, evaluation and operations—not only an LLM call."
  },
  {
    "id": "gke-platform",
    "title": "Production GKE Platform",
    "category": "Candidate Validation",
    "question": "Design a secure, highly available GKE platform for approximately 40 microservices.",
    "technical": [
      "Use a regional private cluster, multiple zones, dedicated service accounts and Workload Identity.",
      "Configure requests and limits, readiness/liveness/startup probes, HPA, PodDisruptionBudgets and topology spread.",
      "Use NetworkPolicies, pod security, Secret Manager integration and controlled ingress.",
      "Adopt progressive delivery, controlled upgrades, backup/restore testing and central observability."
    ],
    "layman": "A well-run apartment complex has several buildings, backup utilities, security checkpoints and rules preventing one resident from consuming everything.",
    "usecases": [
      "Enterprise microservice platform with public APIs and internal workers."
    ],
    "code": "Interview focus:\n- Production GKE requires workload, network, identity, upgrade and failure controls.",
    "followups": [
      "Autopilot or Standard and why?",
      "What happens when a zone fails?",
      "How are upgrades performed?"
    ],
    "redflags": [
      "Secrets in YAML",
      "No resource limits",
      "Assumes replicas equal disaster recovery"
    ],
    "memory": "Production GKE requires workload, network, identity, upgrade and failure controls."
  },
  {
    "id": "event-payment",
    "title": "Reliable Event-Driven Payments or Credentials",
    "category": "Event-Driven Architecture",
    "question": "Design an event-driven flow where messages must not be lost and duplicate business actions must not occur.",
    "technical": [
      "Assume at-least-once delivery and make consumers idempotent.",
      "Write business state and an outbox record in one transaction, then publish asynchronously.",
      "Use a unique event ID and inbox/processed-event record with a unique database constraint.",
      "Acknowledge only after durable completion; use bounded backoff, DLQ and replay through the same idempotent path.",
      "Reuse the same idempotency key with external providers and reconcile uncertain outcomes."
    ],
    "layman": "The courier may deliver the instruction twice, so the office stamps each request number and performs it only once.",
    "usecases": [
      "Payment processing",
      "Credential issuance",
      "Order fulfilment"
    ],
    "code": "Interview focus:\n- At-least-once delivery plus durable idempotency prevents duplicate business action.",
    "followups": [
      "What if DB commit succeeds but acknowledgement fails?",
      "How is replay safe?",
      "How is ordering handled?"
    ],
    "redflags": [
      "Claims exactly-once without idempotency",
      "Acknowledges before commit",
      "Unlimited retry or no DLQ"
    ],
    "memory": "At-least-once delivery plus durable idempotency prevents duplicate business action."
  },
  {
    "id": "subscription-api",
    "title": "Idempotent Paid-Subscription API",
    "category": "API & Backend",
    "question": "Design an external API that creates a paid subscription. Clients may retry after network timeouts. How do you prevent duplicate subscriptions or charges?",
    "technical": [
      "Require a client idempotency key scoped to tenant or customer and store it durably.",
      "Store a request fingerprint, operation state, resource ID and original response.",
      "Use a unique constraint so one concurrent request owns the operation.",
      "Reuse the same key with the payment provider and reject reuse with a different request body.",
      "Add business uniqueness constraints, reconciliation, audit, authorisation and rate limiting.",
      "Classify operations as safe, idempotent or non-idempotent, and have clients retry with bounded backoff and jitter."
    ],
    "layman": "A ticket number identifies one purchase. Showing the same ticket again returns the same result instead of charging again.",
    "usecases": [
      "POST /v1/subscriptions with an Idempotency-Key header."
    ],
    "code": "Interview focus:\n- Idempotency must cover the API, database and payment provider.",
    "followups": [
      "What if payment succeeds but the local write fails?",
      "How long are keys retained?",
      "What if two different keys create the same plan?",
      "How are simultaneous retries handled?"
    ],
    "redflags": [
      "Frontend button disabling only",
      "New provider key on retry",
      "In-memory deduplication only",
      "Blind retries on writes"
    ],
    "memory": "Idempotency must cover the API, database and payment provider."
  },
  {
    "id": "incident-lead",
    "title": "Major Production Incident Leadership",
    "category": "Production Operations",
    "question": "Describe the most severe production incident you personally led. What steps did you follow in the first 15 minutes, and what permanent changes followed?",
    "technical": [
      "Declare severity, establish a channel and assign incident command.",
      "Assess business impact and stabilise before extended root-cause analysis.",
      "Freeze unrelated changes, inspect RED metrics and use rollback, feature flags, load shedding or degradation.",
      "Give regular stakeholder updates and preserve a timeline.",
      "Verify recovery and monitor for recurrence before standing down.",
      "Complete a blameless review with corrective actions, owners, due dates, tests, alerts and runbook updates."
    ],
    "layman": "During a fire, first protect people and stop the fire spreading; investigate the exact ignition source after the building is stable.",
    "usecases": [
      "Latency spike after deployment caused by an expensive query and connection-pool exhaustion."
    ],
    "code": "Interview focus:\n- Incident leadership means stabilise, communicate, learn and prevent recurrence.",
    "followups": [
      "What decision did you personally make?",
      "How was customer impact measured?",
      "Which actions remain open?",
      "What is the communication cadence?",
      "Who may authorise rollback?"
    ],
    "redflags": [
      "Blames an individual",
      "Cannot quantify impact",
      "Only restarted servers",
      "No permanent change",
      "Uncoordinated production changes"
    ],
    "memory": "Incident leadership means stabilise, communicate, learn and prevent recurrence."
  },
  {
    "id": "db-service-choice",
    "title": "Cloud SQL, Spanner, Firestore and Bigtable",
    "category": "Data & Databases",
    "question": "Compare Cloud SQL, Spanner, Firestore and Bigtable and give suitable and unsuitable use cases.",
    "technical": [
      "Cloud SQL suits relational transactions at moderate scale but needs connection, capacity and failover planning.",
      "Spanner suits globally scalable relational workloads with strong consistency but costs more and requires careful key design.",
      "Firestore suits document-oriented and real-time applications with planned query patterns.",
      "Bigtable suits very high-throughput key or time-series access, not relational joins and general transactions."
    ],
    "layman": "Choose the correct storage cabinet for the shape of the information and how it must be retrieved.",
    "usecases": [
      "Subscriptions in Cloud SQL, global strongly consistent records in Spanner, user settings in Firestore and telemetry in Bigtable."
    ],
    "code": "Interview focus:\n- Choose data services from consistency, query, scale and operational requirements.",
    "followups": [
      "Which service for a financial ledger?",
      "How do access patterns change the choice?"
    ],
    "redflags": [
      "NoSQL is always more scalable",
      "No discussion of consistency or transactions"
    ],
    "memory": "Choose data services from consistency, query, scale and operational requirements."
  },
  {
    "id": "media-pipeline",
    "title": "Media Upload and Encoding Pipeline",
    "category": "File & Media Processing",
    "question": "Design a media upload and encoding pipeline that creates multiple renditions, subtitles, thumbnails and DRM artefacts.",
    "technical": [
      "Use signed or resumable direct upload to object storage, checksum validation and quarantine.",
      "Trigger an idempotent asynchronous workflow through Pub/Sub or a workflow engine.",
      "Track explicit job states and run independent renditions in parallel with bounded retries and DLQ.",
      "Publish the final manifest only after required outputs succeed; use CDN, lifecycle policies and cost/quality metrics."
    ],
    "layman": "A film enters a factory where separate stations create HD, mobile, subtitles and thumbnails. It is published only after required stations pass.",
    "usecases": [
      "Streaming-platform encoding pipeline."
    ],
    "code": "Interview focus:\n- Large media processing should be direct-uploaded, asynchronous, stateful and idempotent.",
    "followups": [
      "How do you avoid encoding the same source three times?",
      "How do you recover partially completed work?"
    ],
    "redflags": [
      "Synchronous processing in upload request",
      "No job state or idempotency",
      "No quarantine"
    ],
    "memory": "Large media processing should be direct-uploaded, asynchronous, stateful and idempotent."
  },
  {
    "id": "cost-validation",
    "title": "Validate Cost-Reduction Claims",
    "category": "FinOps",
    "question": "How did you calculate infrastructure cost reductions, and how did you ensure performance and availability were not sacrificed?",
    "technical": [
      "Show before-and-after cost by compute, storage, egress, licences and operations.",
      "Normalise for traffic and report unit cost such as cost per user, request or encoded minute.",
      "Include engineering and migration cost and disclose operational trade-offs.",
      "Verify SLO, latency and load-test results before declaring success."
    ],
    "layman": "A cheaper delivery company is not truly cheaper if it loses parcels or takes twice as long.",
    "usecases": [
      "Compare an Aspera replacement or GKE migration using unit economics."
    ],
    "code": "Interview focus:\n- Cost improvement must be normalised and balanced against reliability and performance.",
    "followups": [
      "Was traffic equal in both periods?",
      "Was redundancy reduced?",
      "What hidden support cost appeared?"
    ],
    "redflags": [
      "Quotes a percentage without baseline numbers",
      "Savings came from removing resilience"
    ],
    "memory": "Cost improvement must be normalised and balanced against reliability and performance."
  },
  {
    "id": "multi-tenant-security",
    "title": "Multi-Tenant Cloud Security",
    "category": "Security",
    "question": "How would you secure a multi-tenant application containing client-sensitive data on GCP?",
    "technical": [
      "Classify data and use least-privilege IAM, Workload Identity, Secret Manager and encryption.",
      "Enforce tenant authorisation at identity, application and data layers.",
      "Use private networking, Cloud Armor, audit logs, vulnerability management, backups and retention/deletion controls.",
      "Use just-in-time approved and audited privileged access, never a shared permanent admin account."
    ],
    "layman": "Each customer has a locked room in the same building, and staff receive only time-limited access to rooms they must service.",
    "usecases": [
      "Enterprise SaaS processing confidential documents."
    ],
    "code": "Interview focus:\n- Tenant security requires identity, data, network, key and operational isolation.",
    "followups": [
      "How is emergency database access granted?",
      "How are tenant restores performed?",
      "How are keys rotated?"
    ],
    "redflags": [
      "Frontend-only tenant checks",
      "Long-lived service keys",
      "Shared admin account"
    ],
    "memory": "Tenant security requires identity, data, network, key and operational isolation."
  },
  {
    "id": "observability-sre",
    "title": "Production Observability and SRE",
    "category": "Observability",
    "question": "What dashboards and alerts must exist before a service is production-ready?",
    "technical": [
      "Use RED metrics: request rate, errors and duration, plus saturation and dependency health.",
      "Add business transaction metrics, queue backlog and DLQ, database connections, deployment markers and synthetic checks.",
      "Use structured logs, correlation IDs and distributed traces.",
      "Maintain SLO and error-budget dashboards with actionable burn-rate alerts linked to runbooks."
    ],
    "layman": "A car dashboard needs speed, fuel, warning lights and engine temperature—not only whether the engine is switched on.",
    "usecases": [
      "Production API dashboard with p95 latency, success rate, dependency latency and release markers."
    ],
    "code": "Interview focus:\n- Observe user outcomes, dependencies, saturation and SLO burn.",
    "followups": [
      "Which alerts should page a human?",
      "How is missing telemetry detected?"
    ],
    "redflags": [
      "CPU-only monitoring",
      "Alerts on every error",
      "No business-level metric"
    ],
    "memory": "Observe user outcomes, dependencies, saturation and SLO burn."
  },
  {
    "id": "agentic-refund",
    "title": "Agentic Refund Workflow",
    "category": "AI & GenAI",
    "question": "Design an agentic system that reads a support request, checks customer records, proposes a refund and executes it after approval.",
    "technical": [
      "Use deterministic workflow steps for critical operations and model reasoning only where flexibility is needed.",
      "Define typed tools and enforce identity, tenant and permission in application code.",
      "Separate read and write tools, apply least privilege and require human approval before financial action.",
      "Persist state, enforce step, time and token limits, use idempotency and audit every decision and tool call."
    ],
    "layman": "The assistant may recommend a refund, but a controlled cashier system verifies authority and requires approval before money moves.",
    "usecases": [
      "Customer-support automation with human-approved refunds."
    ],
    "code": "Interview focus:\n- Agent reasoning never replaces deterministic authorisation and transaction controls.",
    "followups": [
      "When should multiple agents not be used?",
      "How is a failed run reproduced?",
      "How is duplicate refund prevented?"
    ],
    "redflags": [
      "Model directly calls unrestricted refund API",
      "No human approval",
      "No execution limits"
    ],
    "memory": "Agent reasoning never replaces deterministic authorisation and transaction controls."
  },
  {
    "id": "ai-coding-policy",
    "title": "Enterprise AI Coding-Assistant Policy",
    "category": "AI Governance",
    "question": "Define an enterprise policy for using Copilot, Cursor, Gemini Code Assist, ChatGPT or Claude on client projects.",
    "technical": [
      "Allow only approved enterprise tools and accounts after reviewing retention, training, residency and admin controls.",
      "Do not submit secrets, production data, personal data or sensitive client code to unapproved tools.",
      "Treat generated code as untrusted; the submitting developer remains accountable.",
      "Require tests, review, SAST, dependency, secret and licence scans, with specialist review for auth, crypto, payments, tenant isolation and infrastructure.",
      "Maintain prompt guidance, training, exceptions and outcome-based productivity metrics."
    ],
    "layman": "AI is a fast junior contributor: useful, but every output must be understood, checked and owned by a human.",
    "usecases": [
      "Enterprise secure-development standard for AI-assisted delivery."
    ],
    "code": "Interview focus:\n- AI assistance accelerates work but never transfers accountability.",
    "followups": [
      "What happens after a secret is pasted?",
      "Who owns an AI defect?",
      "How are suggested packages verified?"
    ],
    "redflags": [
      "Any personal tool allowed",
      "Passing unit tests is enough",
      "No client-code policy"
    ],
    "memory": "AI assistance accelerates work but never transfers accountability."
  },
  {
    "id": "frontend-architecture",
    "title": "Frontend Architecture for Multiple Teams",
    "category": "Full-Stack Engineering",
    "question": "Design the frontend architecture for a large React application maintained by several teams.",
    "technical": [
      "Organise by business domain with explicit ownership and a shared design system.",
      "Separate server state, form state and local UI state; avoid an uncontrolled global store.",
      "Use route-level code splitting, error boundaries, typed API contracts and frontend observability.",
      "Address accessibility, Core Web Vitals, authentication, authorisation, XSS, CSRF and CSP."
    ],
    "layman": "A large shopping centre needs clear departments, shared building standards and independent teams without everyone rewiring the same switchboard.",
    "usecases": [
      "Enterprise React portal with customer, billing and admin domains."
    ],
    "code": "Interview focus:\n- Frontend lead depth includes architecture, security, performance and team boundaries.",
    "followups": [
      "What did you implement recently?",
      "How are API contracts validated?",
      "When are micro-frontends justified?"
    ],
    "redflags": [
      "Only discusses components",
      "No accessibility or performance",
      "Global state for everything"
    ],
    "memory": "Frontend lead depth includes architecture, security, performance and team boundaries."
  },
  {
    "id": "bigquery-streaming",
    "title": "Near-Real-Time Analytics into BigQuery",
    "category": "Data Engineering",
    "question": "Design a near-real-time application-event pipeline into BigQuery.",
    "technical": [
      "Publish versioned events to Pub/Sub and validate or enrich them using Dataflow or another managed processor.",
      "Send malformed events to a DLQ and support replay.",
      "Handle event time, processing time, watermarks, late data, idempotency and deduplication.",
      "Partition and cluster BigQuery tables, protect PII and monitor quality, latency and cost."
    ],
    "layman": "Events are parcels on a conveyor belt: label them consistently, redirect damaged parcels and store them on organised shelves.",
    "usecases": [
      "Product analytics and audit-event pipeline."
    ],
    "code": "Interview focus:\n- A streaming pipeline needs schema, time, quality, replay and cost controls.",
    "followups": [
      "How are late events handled?",
      "How is schema evolution governed?",
      "How are duplicates managed?"
    ],
    "redflags": [
      "Application writes every event directly to BigQuery",
      "No DLQ or schema version"
    ],
    "memory": "A streaming pipeline needs schema, time, quality, replay and cost controls."
  },
  {
    "id": "security-deadline",
    "title": "Security Finding versus Release Deadline",
    "category": "Leadership",
    "question": "A client insists on a Friday release, but testing finds a high-severity authorisation vulnerability. What do you do?",
    "technical": [
      "Explain the concrete risk and affected scenarios; do not minimise it.",
      "Block the vulnerable feature or reduce scope to a demonstrably safe release.",
      "Use formal risk acceptance only through authorised governance and document the decision.",
      "Assign remediation, verification and controlled enablement."
    ],
    "layman": "A deadline does not justify leaving the front door unlocked. Deliver a safe subset or delay the unsafe part.",
    "usecases": [
      "Block a cross-tenant endpoint while releasing unrelated safe features."
    ],
    "code": "Interview focus:\n- Protect customers first and use formal governance for residual risk.",
    "followups": [
      "Who may accept the risk?",
      "Can a frontend check be a temporary fix?"
    ],
    "redflags": [
      "Releases after verbal acceptance",
      "Treats security as another team’s problem"
    ],
    "memory": "Protect customers first and use formal governance for residual risk."
  },
  {
    "id": "architecture-disagreement",
    "title": "Resolve an Architecture Disagreement",
    "category": "Leadership",
    "question": "Two senior engineers disagree: one wants GKE microservices and the other a modular monolith on Cloud Run. How do you decide?",
    "technical": [
      "Return to functional and non-functional requirements, team topology and operational maturity.",
      "Define criteria such as independent scaling and deployment, transactions, cost, reliability, delivery speed and reversibility.",
      "Use evidence or a focused spike, not seniority.",
      "Record the choice, alternatives and consequences in an ADR with a review trigger."
    ],
    "layman": "Choose the vehicle based on the journey, passengers and road—not because one engineer likes trucks.",
    "usecases": [
      "A new product with a small team may favour a modular monolith."
    ],
    "code": "Interview focus:\n- Architecture decisions should be requirement-led, evidence-based and documented.",
    "followups": [
      "Which decision is easier to reverse?",
      "What evidence would change the choice?"
    ],
    "redflags": [
      "Automatically chooses microservices",
      "No cost or operations discussion",
      "No ADR"
    ],
    "memory": "Architecture decisions should be requirement-led, evidence-based and documented."
  },
  {
    "id": "engineering-quality",
    "title": "Improve Engineering Quality",
    "category": "Leadership",
    "question": "Code quality varies significantly. What mechanisms would you introduce in the first 60 days?",
    "technical": [
      "Understand failure patterns before imposing standards.",
      "Define a practical Definition of Done, coding/API standards, PR templates and architecture boundaries.",
      "Automate formatting, tests, static analysis, dependency scanning and quality gates.",
      "Use pairing, design reviews, coaching and delegated ownership; avoid becoming the only reviewer.",
      "Measure escaped defects, change-failure rate, lead time and review delays."
    ],
    "layman": "Improve the factory process, training and inspection rather than personally repairing every defective item.",
    "usecases": [
      "Standardise a mixed-seniority full-stack team."
    ],
    "code": "Interview focus:\n- Improve systems and capability, not only individual code changes.",
    "followups": [
      "How do you prevent the lead becoming a bottleneck?",
      "How are standards enforced?"
    ],
    "redflags": [
      "Lead rewrites everyone’s code",
      "Measures lines of code",
      "No coaching"
    ],
    "memory": "Improve systems and capability, not only individual code changes."
  },
  {
    "id": "presales-ai",
    "title": "Pre-Sales Estimation for an AI Assistant",
    "category": "Leadership",
    "question": "A client requests a fixed-price AI document assistant but provides only a one-page requirement. How would you estimate and respond?",
    "technical": [
      "Make assumptions explicit and propose discovery.",
      "Assess documents, integrations, security, residency, user volume, latency and acceptance criteria.",
      "Include data preparation, evaluation, model and token cost, environments, support and governance.",
      "Use ranges or a paid spike for unknowns and define exclusions, risks and change control."
    ],
    "layman": "Do not quote the cost of a house from a sketch that omits size, foundations and materials.",
    "usecases": [
      "RFP response for an enterprise RAG assistant."
    ],
    "code": "Interview focus:\n- Estimate uncertainty, evaluation and operations—not only implementation.",
    "followups": [
      "What acceptance metric defines success?",
      "Who owns source quality?",
      "What recurring cloud cost is included?"
    ],
    "redflags": [
      "Immediate person-day estimate",
      "Ignores evaluation and model cost"
    ],
    "memory": "Estimate uncertainty, evaluation and operations—not only implementation."
  },
  {
    "id": "recommendation-validation",
    "title": "Recommendation-Engine Validation",
    "category": "Candidate Validation",
    "question": "You state that you designed a recommendation engine. Explain the approach, data, offline metrics, online experiment, cold-start handling and deployment.",
    "technical": [
      "Identify whether the solution was rules-based, content-based, collaborative or hybrid.",
      "Describe training and feature data, leakage controls and freshness.",
      "Use offline ranking metrics and online business experiments; model accuracy alone is insufficient.",
      "Explain cold-start fallback, monitoring, bias and serving architecture."
    ],
    "layman": "Recommendations matter only if they improve real user choices, not merely notebook metrics.",
    "usecases": [
      "Content recommendation for a streaming platform."
    ],
    "code": "Interview focus:\n- Validate model design with offline quality and online business impact.",
    "followups": [
      "What was the control group?",
      "How was popularity bias handled?",
      "What happened for new users?"
    ],
    "redflags": [
      "Cannot name a metric",
      "No online experiment",
      "Calls a rules list AI"
    ],
    "memory": "Validate model design with offline quality and online business impact."
  },
  {
    "id": "vertex-depth",
    "title": "Vertex AI and Vector Search Depth",
    "category": "Candidate Validation",
    "question": "Which Vertex AI components did you personally configure? Explain ingestion, embeddings, indexing, retrieval, evaluation, deployment and monitoring.",
    "technical": [
      "Name concrete services and configurations instead of saying only “we used Vertex AI”.",
      "Explain embedding model, index dimensions, metadata restrictions, query flow and versioning.",
      "Describe quality evaluation, capacity, latency, index rebuild and failure monitoring.",
      "Separate personal implementation from review or team contribution."
    ],
    "layman": "Knowing the name of a machine is not the same as knowing how it was configured, operated and repaired.",
    "usecases": [
      "Validate claimed RAG or recommendation experience."
    ],
    "code": "Interview focus:\n- Require concrete configuration, metrics, failures and personal ownership.",
    "followups": [
      "How was the index updated?",
      "How were ACL filters applied?",
      "How was quality measured?"
    ],
    "redflags": [
      "Only called a hosted API",
      "No evaluation or monitoring"
    ],
    "memory": "Require concrete configuration, metrics, failures and personal ownership."
  },
  {
    "id": "terraform-model",
    "title": "Terraform Operating Model",
    "category": "Infrastructure as Code",
    "question": "Describe the Terraform repository structure, state management, environment isolation, module design, review and drift handling you used.",
    "technical": [
      "Use remote state with controlled access and locking where supported.",
      "Separate reusable modules from environment composition and avoid copy-paste estates.",
      "Run formatting, validation, security checks and plans in CI; apply through controlled identities.",
      "Handle imports, drift detection, state recovery and version pinning explicitly."
    ],
    "layman": "Terraform is the approved blueprint and construction process; people should not secretly rebuild rooms by hand.",
    "usecases": [
      "Shared GCP network and GKE modules."
    ],
    "code": "Interview focus:\n- IaC requires state governance, review, controlled apply and drift management.",
    "followups": [
      "How is state recovered?",
      "How are destructive plans blocked?",
      "How are secrets kept out of state?"
    ],
    "redflags": [
      "Local state only",
      "Manual production apply from laptop",
      "No plan review"
    ],
    "memory": "IaC requires state governance, review, controlled apply and drift management."
  },
  {
    "id": "outside-gke",
    "title": "Why Workloads Remained Outside GKE",
    "category": "Candidate Validation",
    "question": "You state that 90% of services moved to GKE. What remained outside, and why?",
    "technical": [
      "A strong answer chooses the platform per workload rather than treating Kubernetes as mandatory.",
      "Justified exceptions include managed databases, event functions, simple Cloud Run workloads, appliances and legacy VMs.",
      "Explain cost, operational ownership, scaling, latency, security and migration risk."
    ],
    "layman": "Not every package needs a shipping container; use the simplest transport that meets the need.",
    "usecases": [
      "Keep managed databases and simple event functions outside the application cluster."
    ],
    "code": "Interview focus:\n- Platform selection should minimise operational complexity while meeting requirements.",
    "followups": [
      "Would a small stateless service fit Cloud Run?",
      "What is the operational cost of GKE?"
    ],
    "redflags": [
      "Everything must run in Kubernetes",
      "No decision criteria"
    ],
    "memory": "Platform selection should minimise operational complexity while meeting requirements."
  },
  {
    "id": "leadership-scope",
    "title": "Technical Leadership Scope",
    "category": "Candidate Validation",
    "question": "How many engineers reported to you, what disciplines were represented, and what hiring, performance, architecture and delivery decisions were you accountable for?",
    "technical": [
      "Distinguish line management, technical leadership, project coordination and informal mentoring.",
      "Describe team size, roles, decision authority and measurable outcomes.",
      "Explain delegated ownership, performance feedback, hiring input and stakeholder responsibility."
    ],
    "layman": "Leading a meeting is not the same as being accountable for the team, architecture and production outcomes.",
    "usecases": [
      "Validate whether résumé leadership was genuine Tech Lead scope."
    ],
    "code": "Interview focus:\n- Leadership claims require scope, authority, accountability and outcomes.",
    "followups": [
      "Who made final architecture decisions?",
      "Did you conduct performance reviews?",
      "How were tasks delegated?"
    ],
    "redflags": [
      "Only facilitated ceremonies",
      "Cannot describe authority or accountability"
    ],
    "memory": "Leadership claims require scope, authority, accountability and outcomes."
  },
  {
    "id": "production-ai-ownership",
    "title": "Production AI Ownership",
    "category": "AI & GenAI",
    "question": "Describe one production AI system where you personally owned evaluation, deployment, monitoring and rollback.",
    "technical": [
      "State the model, business purpose, data and evaluation baseline.",
      "Explain deployment topology, release gates, online monitoring and fallback.",
      "Describe drift, safety, cost and rollback.",
      "Be explicit about personal ownership versus work done by other teams."
    ],
    "layman": "A production model needs an operating manual, dashboard and emergency brake—not only a successful demo.",
    "usecases": [
      "Validate LLMOps or ML platform depth."
    ],
    "code": "Interview focus:\n- Production AI experience includes evaluation, operation, incident response and rollback.",
    "followups": [
      "What metric triggered rollback?",
      "How was model versioning handled?",
      "What failed in production?"
    ],
    "redflags": [
      "Only proof-of-concept experience",
      "No rollback or monitoring"
    ],
    "memory": "Production AI experience includes evaluation, operation, incident response and rollback."
  },
  {
    "id": "requirements-to-solution",
    "title": "Translate Business Requirements into Architecture",
    "category": "Software Architecture",
    "question": "How do you convert a business requirement into a technical solution?",
    "technical": [
      "Clarify business outcome, users, workflows, constraints and edge cases.",
      "Capture measurable functional and non-functional requirements, security, integrations and data ownership.",
      "Develop options with trade-offs and choose the simplest design that satisfies the need.",
      "Document HLD, critical LLD details and ADRs, then define delivery slices, acceptance criteria and operational readiness."
    ],
    "layman": "Understand what problem must be solved before choosing construction materials.",
    "usecases": [
      "Convert a subscription workflow into APIs, data, events, security and SLOs."
    ],
    "code": "Interview focus:\n- Requirements should become measurable architecture decisions and acceptance criteria.",
    "followups": [
      "Which requirement is measurable?",
      "What assumption carries the greatest risk?"
    ],
    "redflags": [
      "Chooses technology before understanding the problem",
      "Ignores non-functional requirements"
    ],
    "memory": "Requirements should become measurable architecture decisions and acceptance criteria."
  },
  {
    "id": "hld-lld-adr",
    "title": "HLD, LLD and ADR",
    "category": "Software Architecture",
    "question": "What is the difference between an HLD, LLD and ADR?",
    "technical": [
      "HLD describes context, major components, integrations, data flow, deployment and major technology choices.",
      "LLD describes implementation details such as APIs, schemas, sequences, classes and error handling.",
      "ADR records one decision, alternatives, rationale and consequences.",
      "These documents should be lightweight, current and useful."
    ],
    "layman": "HLD is the city map, LLD is the building blueprint and ADR records why a specific construction choice was made.",
    "usecases": [
      "Document a new payment service and the choice of event-driven integration."
    ],
    "code": "Interview focus:\n- HLD shows the system, LLD shows implementation and ADR explains a decision.",
    "followups": [
      "When should an ADR be revisited?",
      "Who owns documentation updates?"
    ],
    "redflags": [
      "Treats documentation as a one-time governance task"
    ],
    "memory": "HLD shows the system, LLD shows implementation and ADR explains a decision."
  },
  {
    "id": "design-principles",
    "title": "Software Design Principles",
    "category": "Software Architecture",
    "question": "What principles do you follow when designing software?",
    "technical": [
      "Use separation of concerns, high cohesion, low coupling, encapsulation and explicit contracts.",
      "Apply SOLID, dependency inversion, composition over inheritance, DRY and YAGNI with judgement.",
      "Design for idempotency, backward compatibility, observability, security and safe failure.",
      "Treat principles as guides, not absolute laws."
    ],
    "layman": "Keep responsibilities clear, connections controlled and unnecessary machinery out.",
    "usecases": [
      "Keep business rules independent of a database framework."
    ],
    "code": "Interview focus:\n- Good design reduces coupling while keeping the solution understandable.",
    "followups": [
      "When can DRY harm design?",
      "Give an example where duplication is safer."
    ],
    "redflags": [
      "Recites acronyms without examples",
      "Applies patterns regardless of context"
    ],
    "memory": "Good design reduces coupling while keeping the solution understandable."
  },
  {
    "id": "modular-monolith",
    "title": "When to Choose a Modular Monolith",
    "category": "Software Architecture",
    "question": "When would you choose a modular monolith instead of microservices?",
    "technical": [
      "Choose it when the domain is evolving, the team is small, transaction boundaries matter and independent deployment is not required.",
      "Maintain explicit modules, controlled dependencies, contracts and ownership.",
      "Extract services only when independent scale, deployment or isolation creates measurable value."
    ],
    "layman": "Build one well-organised house before creating a neighbourhood with roads, utilities and separate maintenance teams.",
    "usecases": [
      "Early-stage product with one team and strongly related workflows."
    ],
    "code": "Interview focus:\n- A modular monolith is often the simplest production architecture for one cohesive team.",
    "followups": [
      "How do you prevent a big ball of mud?",
      "What event would justify extraction?"
    ],
    "redflags": [
      "Says monolith always means legacy",
      "Microservices automatically chosen for scale"
    ],
    "memory": "A modular monolith is often the simplest production architecture for one cohesive team."
  },
  {
    "id": "microservice-justification",
    "title": "When Microservices Are Justified",
    "category": "Software Architecture",
    "question": "What factors justify using microservices?",
    "technical": [
      "Independent deployment, scaling, ownership, failure isolation or technology requirements.",
      "Clear domain boundaries and teams able to own services end-to-end.",
      "Accept network failure, eventual consistency, contract versioning, distributed tracing and higher operational cost."
    ],
    "layman": "Separate buildings make sense when departments need independent schedules and capacity, but roads and utilities become more complex.",
    "usecases": [
      "Separate payment and recommendation services with different risk and scaling profiles."
    ],
    "code": "Interview focus:\n- Use microservices when independence is worth the operational complexity.",
    "followups": [
      "Which boundary reduces team coordination?",
      "What is the operational cost of another service?"
    ],
    "redflags": [
      "Only benefit named is scalability",
      "No distributed-system trade-offs"
    ],
    "memory": "Use microservices when independence is worth the operational complexity."
  },
  {
    "id": "technical-debt",
    "title": "Managing Technical Debt",
    "category": "Software Architecture",
    "question": "What is technical debt, and how should a Tech Lead manage it?",
    "technical": [
      "Technical debt is future delivery or operational cost created by shortcuts, outdated design, missing tests or accumulated complexity.",
      "Make it visible and classify it by business and risk impact.",
      "Prioritise security and reliability debt, allocate capacity and remediate incrementally.",
      "Avoid using technical debt as an automatic reason for a full rewrite."
    ],
    "layman": "Borrowing time today creates interest payments tomorrow; repay the most dangerous loans first.",
    "usecases": [
      "Replace a fragile shared authentication library without stopping all feature work."
    ],
    "code": "Interview focus:\n- Manage technical debt as a visible risk portfolio, not an invisible complaint.",
    "followups": [
      "How is debt prioritised against features?",
      "When is a rewrite justified?"
    ],
    "redflags": [
      "Wants to remove all debt immediately",
      "Cannot explain business impact"
    ],
    "memory": "Manage technical debt as a visible risk portfolio, not an invisible complaint."
  },
  {
    "id": "code-review",
    "title": "Effective Code Review",
    "category": "Software Development",
    "question": "How do you conduct an effective code review?",
    "technical": [
      "Check correctness, readability, maintainability, security, performance, error handling, tests, observability and compatibility.",
      "Automate formatting and routine checks so human review focuses on design and risk.",
      "Keep pull requests small, comments constructive and turnaround predictable.",
      "Promote shared ownership rather than one permanent gatekeeper."
    ],
    "layman": "Inspect whether the machine is safe and correct, not the colour of every screw.",
    "usecases": [
      "Review a subscription endpoint with payment side effects."
    ],
    "code": "Interview focus:\n- Code review should focus on correctness, risk and maintainability.",
    "followups": [
      "What should be automated?",
      "How do you review AI-generated code?"
    ],
    "redflags": [
      "Only comments on formatting",
      "Approves code not understood"
    ],
    "memory": "Code review should focus on correctness, risk and maintainability."
  },
  {
    "id": "definition-done",
    "title": "Definition of Done",
    "category": "Software Development",
    "question": "What should be included in a Definition of Done?",
    "technical": [
      "Code complete, peer reviewed, tested and accepted.",
      "Security scans, API/documentation changes and database migrations completed where relevant.",
      "Monitoring, alerts, feature flags, rollback and runbook prepared for operational changes.",
      "A change is not done merely because it was merged."
    ],
    "layman": "A product is done when it is safe to operate and support, not when it leaves the developer’s desk.",
    "usecases": [
      "Production-ready user story for a new external API."
    ],
    "code": "Interview focus:\n- Definition of Done includes build, validation, operation and support.",
    "followups": [
      "Does every story need the same controls?",
      "Who accepts operational readiness?"
    ],
    "redflags": [
      "Only code and unit tests",
      "No rollback or support preparation"
    ],
    "memory": "Definition of Done includes build, validation, operation and support."
  },
  {
    "id": "production-api",
    "title": "Production-Grade API",
    "category": "API & Backend",
    "question": "What makes an API production-grade?",
    "technical": [
      "Clear resource design, authentication, authorisation, validation and consistent error contracts.",
      "Idempotency, pagination, rate limiting, timeouts, versioning, correlation IDs and audit.",
      "Backward compatibility, observability, documentation, load testing and security testing."
    ],
    "layman": "A public service counter needs identity checks, clear forms, queue control, receipts and a process for errors.",
    "usecases": [
      "External subscription or credential API."
    ],
    "code": "Interview focus:\n- Production APIs combine functional design with reliability, security and operability.",
    "followups": [
      "How are breaking changes introduced?",
      "Which operations require idempotency?"
    ],
    "redflags": [
      "Only discusses endpoint naming",
      "No security or observability"
    ],
    "memory": "Production APIs combine functional design with reliability, security and operability."
  },
  {
    "id": "rest-graphql",
    "title": "REST versus GraphQL",
    "category": "API & Backend",
    "question": "How do you decide between REST and GraphQL?",
    "technical": [
      "REST is often simpler for resource-oriented external APIs, HTTP caching and predictable contracts.",
      "GraphQL suits clients requiring flexible shapes across related data with strong schema governance.",
      "GraphQL requires query complexity limits, field-level authorisation, N+1 controls, resolver monitoring and a caching strategy."
    ],
    "layman": "REST offers fixed menu items; GraphQL lets customers assemble a plate, so the kitchen needs controls against impossible orders.",
    "usecases": [
      "Mobile and web clients requiring different views of the same domain."
    ],
    "code": "Interview focus:\n- Select API style from consumer needs and operational complexity.",
    "followups": [
      "How do you prevent expensive nested queries?",
      "How is field-level access enforced?"
    ],
    "redflags": [
      "GraphQL always reduces network calls",
      "No query-cost protection"
    ],
    "memory": "Select API style from consumer needs and operational complexity."
  },
  {
    "id": "sync-async",
    "title": "Synchronous versus Asynchronous Processing",
    "category": "API & Backend",
    "question": "What is the difference between synchronous and asynchronous processing?",
    "technical": [
      "Synchronous callers wait for completion and receive an immediate result.",
      "Asynchronous systems accept work, return an acknowledgement or job ID and complete through a queue or workflow.",
      "Async design requires durable state, idempotency, retry, DLQ, status, timeout, cancellation and observability."
    ],
    "layman": "Synchronous is waiting at the counter; asynchronous is taking a receipt and returning when the order is ready.",
    "usecases": [
      "Large file processing, media encoding or batch import."
    ],
    "code": "Interview focus:\n- Asynchronous processing trades immediate completion for resilience and throughput.",
    "followups": [
      "When should an API return 202?",
      "How does the user see job status?"
    ],
    "redflags": [
      "Uses a queue but no status or failure model"
    ],
    "memory": "Asynchronous processing trades immediate completion for resilience and throughput."
  },
  {
    "id": "cascading-failure",
    "title": "Prevent Cascading Failures",
    "category": "API & Backend",
    "question": "How do you prevent cascading failures between services?",
    "technical": [
      "Use explicit timeouts, circuit breakers, bounded retries, jitter and retry budgets.",
      "Apply bulkheads, concurrency limits, rate limiting, load shedding and queues.",
      "Design graceful fallback and monitor dependencies separately."
    ],
    "layman": "If one shop closes, prevent its queue from blocking the entire street and provide a limited alternative.",
    "usecases": [
      "Recommendation failure falls back to popular content."
    ],
    "code": "Interview focus:\n- Contain dependency failure with time, retry, concurrency and fallback controls.",
    "followups": [
      "Why can retry make an outage worse?",
      "What is a bulkhead?"
    ],
    "redflags": [
      "Unlimited retries",
      "Very long timeouts",
      "Autoscaling as the only solution"
    ],
    "memory": "Contain dependency failure with time, retry, concurrency and fallback controls."
  },
  {
    "id": "eventual-consistency",
    "title": "Eventual Consistency",
    "category": "Data & Integration",
    "question": "What is eventual consistency?",
    "technical": [
      "Different replicas or services may temporarily show different states but should converge.",
      "Define the acceptable inconsistency window and user experience.",
      "Use idempotent events, ordering/version checks, reconciliation and conflict resolution.",
      "Treat it as a business behaviour, not only a database feature."
    ],
    "layman": "Two branches may not see an update immediately, but they must agree after a known period and resolve conflicts.",
    "usecases": [
      "Subscription state propagated to analytics and recommendation systems."
    ],
    "code": "Interview focus:\n- Eventual consistency requires convergence rules, user behaviour and repair mechanisms.",
    "followups": [
      "What if convergence never happens?",
      "How is stale state shown?"
    ],
    "redflags": [
      "Says data will fix itself",
      "No reconciliation process"
    ],
    "memory": "Eventual consistency requires convergence rules, user behaviour and repair mechanisms."
  },
  {
    "id": "database-migrations",
    "title": "Production Database Migrations",
    "category": "Data & Databases",
    "question": "How should database migrations be handled in production?",
    "technical": [
      "Version migrations and test against production-like volume.",
      "Use backward-compatible expand-and-contract changes and separate long backfills.",
      "Estimate lock and performance impact and prepare recovery.",
      "Observe execution and prefer roll-forward when rollback is unsafe."
    ],
    "layman": "Build the new bridge beside the old one, move traffic gradually and remove the old bridge later.",
    "usecases": [
      "Rename a column through add, dual write, backfill, read switch and later removal."
    ],
    "code": "Interview focus:\n- Safe migrations preserve compatibility while application versions overlap.",
    "followups": [
      "What happens during rollback?",
      "How are long backfills throttled?"
    ],
    "redflags": [
      "Breaking change in one release",
      "No lock analysis"
    ],
    "memory": "Safe migrations preserve compatibility while application versions overlap."
  },
  {
    "id": "slow-query",
    "title": "Diagnose a Slow Database Query",
    "category": "Data & Databases",
    "question": "How do you diagnose a slow database query?",
    "technical": [
      "Identify and reproduce the query with representative data.",
      "Inspect the execution plan, indexes, estimates, scans, joins, locks and data distribution.",
      "Check connection pool, CPU, memory and I/O.",
      "Validate improvements under realistic load."
    ],
    "layman": "Read the route map and traffic conditions before adding another road.",
    "usecases": [
      "Slow tenant report after data growth."
    ],
    "code": "Interview focus:\n- Use the execution plan and system metrics to identify the real bottleneck.",
    "followups": [
      "What does the execution plan show?",
      "Can an index make writes worse?"
    ],
    "redflags": [
      "Immediately adds indexes",
      "Only increases database size"
    ],
    "memory": "Use the execution plan and system metrics to identify the real bottleneck."
  },
  {
    "id": "connection-exhaustion",
    "title": "Prevent Database Connection Exhaustion",
    "category": "Data & Databases",
    "question": "How do you prevent database connection exhaustion?",
    "technical": [
      "Use bounded pools, query and connection timeouts and correct connection release.",
      "Coordinate pool size across every application replica.",
      "Limit concurrency, apply backpressure, detect long transactions and use a proxy where appropriate.",
      "Remember that application autoscaling can overwhelm a fixed database."
    ],
    "layman": "Opening more checkout counters does not help if every counter reserves many lines to the same small bank office.",
    "usecases": [
      "GKE scales API Pods and exhausts Cloud SQL connections."
    ],
    "code": "Interview focus:\n- Pool size must be coordinated with total replicas and database capacity.",
    "followups": [
      "How is total pool capacity calculated?",
      "What happens when the pool is full?"
    ],
    "redflags": [
      "One connection per request",
      "Unbounded pool"
    ],
    "memory": "Pool size must be coordinated with total replicas and database capacity."
  },
  {
    "id": "multi-tenancy-definition",
    "title": "Definition of Multi-Tenancy",
    "category": "Multi-Tenancy",
    "question": "What is a multi-tenant application?",
    "technical": [
      "One platform serves multiple customer organisations while isolating data, users, configuration, billing, quotas and operations.",
      "One tenant must not access or materially degrade another tenant."
    ],
    "layman": "Several companies share one office building, but each has secure rooms, separate records and fair access to utilities.",
    "usecases": [
      "Enterprise SaaS platform."
    ],
    "code": "Interview focus:\n- Multi-tenancy means shared platform with enforced logical or physical isolation.",
    "followups": [
      "What assets require isolation?",
      "Can one user belong to several tenants?"
    ],
    "redflags": [
      "Defines it only as a shared database"
    ],
    "memory": "Multi-tenancy means shared platform with enforced logical or physical isolation."
  },
  {
    "id": "tenancy-models",
    "title": "Common Multi-Tenancy Models",
    "category": "Multi-Tenancy",
    "question": "What are the common multi-tenancy models?",
    "technical": [
      "Shared database and schema with tenant_id is efficient but carries the highest accidental-leak risk.",
      "Shared database with separate schemas improves logical isolation but increases migration overhead.",
      "Separate database per tenant improves isolation and restore but costs more.",
      "Separate deployment offers strongest isolation and highest operational cost.",
      "Hybrid models are common."
    ],
    "layman": "Customers can share a filing room, have separate cabinets, separate rooms or separate buildings.",
    "usecases": [
      "Standard tenants share a schema while regulated tenants receive dedicated databases."
    ],
    "code": "Interview focus:\n- Choose a tenancy model from isolation, restore, scale, cost and compliance.",
    "followups": [
      "How are thousands of schemas migrated?",
      "Which customers need dedicated isolation?"
    ],
    "redflags": [
      "One model chosen for all customers",
      "No restore or compliance consideration"
    ],
    "memory": "Choose a tenancy model from isolation, restore, scale, cost and compliance."
  },
  {
    "id": "choose-tenancy",
    "title": "Selecting a Tenancy Model",
    "category": "Multi-Tenancy",
    "question": "How do you choose the correct tenancy model?",
    "technical": [
      "Consider tenant count and size, regulation, residency, restore, performance guarantees, customisation, cost and operations.",
      "Use contractual requirements and threat modelling.",
      "Support tiered or hybrid isolation when needs differ materially."
    ],
    "layman": "Choose shared rooms or separate buildings according to security, size, service promises and budget.",
    "usecases": [
      "Large regulated tenant receives a dedicated database."
    ],
    "code": "Interview focus:\n- Tenancy is an architectural and commercial tiering decision.",
    "followups": [
      "What is the migration path between tiers?",
      "What is the operational limit?"
    ],
    "redflags": [
      "Only cost considered",
      "No data-residency consideration"
    ],
    "memory": "Tenancy is an architectural and commercial tiering decision."
  },
  {
    "id": "tenant-isolation",
    "title": "Enforcing Tenant Isolation",
    "category": "Multi-Tenancy",
    "question": "How do you enforce tenant isolation?",
    "technical": [
      "Derive tenant context from trusted identity and membership, not a freely supplied field.",
      "Centralise tenant-aware repositories and authorisation and use row-level security or stronger separation where appropriate.",
      "Include tenant identity in cache keys, search filters, messages, storage paths and audits.",
      "Test cross-tenant denial at every interface."
    ],
    "layman": "The room number comes from the verified access badge, not whichever number a visitor writes on the form.",
    "usecases": [
      "Every query and object path is scoped to the authenticated tenant."
    ],
    "code": "Interview focus:\n- Tenant isolation must be systematic across identity, data, cache, search, files and events.",
    "followups": [
      "Where is tenant context established?",
      "How is a background job scoped?"
    ],
    "redflags": [
      "Frontend-only check",
      "Developers manually remember every WHERE tenant_id"
    ],
    "memory": "Tenant isolation must be systematic across identity, data, cache, search, files and events."
  },
  {
    "id": "tenant-leak-causes",
    "title": "Cross-Tenant Data Leak Causes",
    "category": "Multi-Tenancy",
    "question": "How can a cross-tenant data leak happen, and how do you prevent it?",
    "technical": [
      "Missing database or search filter, insecure object reference, shared cache key, wrong file path, stale signed URL, broken background context or admin bypass.",
      "Use central abstractions, row-level controls, tenant-aware cache, search and storage, automated tests, audit and penetration testing.",
      "Treat any leak as a critical security incident."
    ],
    "layman": "A parcel reaches the wrong customer because one warehouse label or delivery route omitted the company name.",
    "usecases": [
      "Invoice endpoint looks up by object ID without tenant scope."
    ],
    "code": "Interview focus:\n- Every data access path must include trusted tenant context and negative tests.",
    "followups": [
      "How are identical IDs across tenants tested?",
      "How are exports validated?"
    ],
    "redflags": [
      "Assumes UUIDs provide authorisation",
      "No cross-tenant tests"
    ],
    "memory": "Every data access path must include trusted tenant context and negative tests."
  },
  {
    "id": "tenant-onboarding",
    "title": "Tenant Onboarding",
    "category": "Multi-Tenancy",
    "question": "How would you design tenant onboarding?",
    "technical": [
      "Create tenant identity, plan, isolation tier, storage or data resources, keys, quotas, defaults, admin and SSO.",
      "Automate provisioning as an idempotent observable workflow with retry, validation and rollback.",
      "Declare success only after a health check confirms the tenant is usable."
    ],
    "layman": "Opening a new branch requires accounts, keys, limits, signs and safety checks—not only adding its name to a list.",
    "usecases": [
      "Enterprise onboarding with SSO and dedicated encryption key."
    ],
    "code": "Interview focus:\n- Provisioning should be automated, resumable, idempotent and verifiable.",
    "followups": [
      "What if provisioning fails halfway?",
      "How does retry avoid duplicate resources?"
    ],
    "redflags": [
      "Manual checklist only",
      "No state or rollback"
    ],
    "memory": "Provisioning should be automated, resumable, idempotent and verifiable."
  },
  {
    "id": "tenant-config",
    "title": "Tenant-Specific Configuration",
    "category": "Multi-Tenancy",
    "question": "How should tenant-specific configuration be managed?",
    "technical": [
      "Use central schema-validated, versioned configuration.",
      "Separate and encrypt secrets and audit changes.",
      "Cache with controlled invalidation, provide safe defaults and use feature flags.",
      "Avoid uncontrolled tenant-specific code branches."
    ],
    "layman": "Keep customer settings in a controlled register, not scattered handwritten notes.",
    "usecases": [
      "Per-tenant branding, features, quota and integration settings."
    ],
    "code": "Interview focus:\n- Tenant configuration must be validated, versioned, secure and auditable.",
    "followups": [
      "How is invalid config rejected?",
      "How is cache invalidated?"
    ],
    "redflags": [
      "Configuration in source-code if statements",
      "Secrets mixed with normal configuration"
    ],
    "memory": "Tenant configuration must be validated, versioned, secure and auditable."
  },
  {
    "id": "noisy-tenant",
    "title": "Handling a Noisy Tenant",
    "category": "Multi-Tenancy",
    "question": "How do you handle a tenant that consumes disproportionate resources?",
    "technical": [
      "Use per-tenant quotas, rate and concurrency limits, fair queues, resource pools and usage metrics.",
      "Separate interactive and batch work and reserve capacity for critical paths.",
      "Move exceptional tenants to dedicated resources when justified."
    ],
    "layman": "One customer cannot occupy every checkout counter and block everyone else.",
    "usecases": [
      "Large import job runs in a separate throttled batch queue."
    ],
    "code": "Interview focus:\n- Noisy-neighbour protection must exist at API, queue, compute and database layers.",
    "followups": [
      "Do API limits protect the database?",
      "How is fairness measured?"
    ],
    "redflags": [
      "Only adds servers",
      "No tenant usage metrics"
    ],
    "memory": "Noisy-neighbour protection must exist at API, queue, compute and database layers."
  },
  {
    "id": "tenant-backup",
    "title": "Tenant-Level Backup and Restore",
    "category": "Multi-Tenancy",
    "question": "How do you perform tenant-level backup and restore?",
    "technical": [
      "Define RPO and RTO and test restores.",
      "For shared data, restore to an isolated environment, extract the tenant, validate integrity and merge safely.",
      "For dedicated databases, restore independently and verify keys, policies and compatibility.",
      "Audit the operation and avoid overwriting newer data."
    ],
    "layman": "Recover one company’s files without rolling the entire shared office back.",
    "usecases": [
      "Restore one tenant’s accidentally deleted records."
    ],
    "code": "Interview focus:\n- Tenant restore requires isolation, validation and protection of newer state.",
    "followups": [
      "How is referential integrity verified?",
      "How are newer updates protected?"
    ],
    "redflags": [
      "Backups exist but restores are untested",
      "Only whole-platform restore"
    ],
    "memory": "Tenant restore requires isolation, validation and protection of newer state."
  },
  {
    "id": "tenant-delete",
    "title": "Safe Tenant Deletion",
    "category": "Multi-Tenancy",
    "question": "How do you delete a tenant safely?",
    "technical": [
      "Verify authority, disable access, revoke sessions and stop jobs.",
      "Delete or anonymise primary data, files, caches, search indexes, embeddings, analytics copies and derived artefacts.",
      "Handle backup retention according to policy and create an immutable deletion audit.",
      "Make the workflow resumable and idempotent."
    ],
    "layman": "Closing a branch means removing records from every filing room, search index and warehouse, not only the front-desk list.",
    "usecases": [
      "Right-to-erasure or contract termination workflow."
    ],
    "code": "Interview focus:\n- Deletion must cover all primary and derived data stores and be resumable.",
    "followups": [
      "How are backups handled?",
      "What if deletion stops halfway?"
    ],
    "redflags": [
      "Deletes only primary DB rows",
      "One large synchronous request"
    ],
    "memory": "Deletion must cover all primary and derived data stores and be resumable."
  },
  {
    "id": "tenant-encryption",
    "title": "Tenant-Specific Encryption",
    "category": "Multi-Tenancy",
    "question": "How do you support tenant-specific encryption?",
    "technical": [
      "Use platform-managed encryption for standard tenants and customer-managed or tenant-specific keys for higher isolation.",
      "Apply envelope encryption, least-privilege key access, rotation, audit and revocation.",
      "Include backup and disaster-recovery key handling and account for operational cost."
    ],
    "layman": "Each customer may have its own safe key, but keys must be rotated, audited and recoverable.",
    "usecases": [
      "Regulated tenant receives a dedicated Cloud KMS key."
    ],
    "code": "Interview focus:\n- Tenant keys improve isolation but add lifecycle and recovery responsibilities.",
    "followups": [
      "What happens after key revocation?",
      "How are backups decrypted?"
    ],
    "redflags": [
      "One shared key with broad access",
      "No rotation"
    ],
    "memory": "Tenant keys improve isolation but add lifecycle and recovery responsibilities."
  },
  {
    "id": "tenant-rbac",
    "title": "Tenant-Aware RBAC",
    "category": "Multi-Tenancy",
    "question": "How should RBAC work in a multi-tenant system?",
    "technical": [
      "Assign roles within tenant context and evaluate them against resource and action.",
      "Separate tenant admin from platform admin and enforce least privilege server-side.",
      "Use ABAC for resource attributes or conditions and audit role changes."
    ],
    "layman": "A manager in Company A is not automatically a manager in Company B or in the building administration team.",
    "usecases": [
      "One user is admin in one tenant and viewer in another."
    ],
    "code": "Interview focus:\n- Roles and permissions must always include tenant context.",
    "followups": [
      "Can a user have different roles per tenant?",
      "How are service identities authorised?"
    ],
    "redflags": [
      "Global role with no tenant scope",
      "Client-side enforcement"
    ],
    "memory": "Roles and permissions must always include tenant context."
  },
  {
    "id": "production-grade",
    "title": "Meaning of Production-Grade",
    "category": "Production Readiness",
    "question": "What does production-grade mean?",
    "technical": [
      "A production system is reliable, secure, scalable, observable, maintainable, testable, recoverable, deployable and supportable.",
      "It has SLOs, alerts, backups with tested restores, safe release and rollback, runbooks, ownership and cost controls.",
      "Functionality alone is not enough."
    ],
    "layman": "A prototype proves a car can move; a production car also needs brakes, lights, seat belts, maintenance and emergency procedures.",
    "usecases": [
      "Production readiness review before go-live."
    ],
    "code": "Interview focus:\n- Production-grade means safe and supportable under real load and failure.",
    "followups": [
      "What artefacts are required before launch?",
      "Who owns support?"
    ],
    "redflags": [
      "Equates production-ready with tests passing"
    ],
    "memory": "Production-grade means safe and supportable under real load and failure."
  },
  {
    "id": "nfrs",
    "title": "Non-Functional Requirements",
    "category": "Production Readiness",
    "question": "What non-functional requirements should be collected?",
    "technical": [
      "Availability, latency, throughput, concurrency, scale, security, privacy and compliance.",
      "RTO, RPO, retention, residency, accessibility, observability, supportability, maintainability and cost.",
      "Make each NFR measurable, including percentile and load."
    ],
    "layman": "Do not ask for “fast and secure”; define how fast, under which load and what security result is required.",
    "usecases": [
      "p95 below 300 ms at 2,000 RPS with 99.9% monthly availability."
    ],
    "code": "Interview focus:\n- NFRs should be measurable acceptance criteria, not adjectives.",
    "followups": [
      "Which NFR drives the highest cost?",
      "How is each target measured?"
    ],
    "redflags": [
      "Uses vague terms only",
      "No recovery or cost requirements"
    ],
    "memory": "NFRs should be measurable acceptance criteria, not adjectives."
  },
  {
    "id": "sli-slo-sla-general",
    "title": "SLI, SLO and SLA Definitions",
    "category": "Production Readiness",
    "question": "Explain SLI, SLO and SLA.",
    "technical": [
      "SLI is the measured indicator, such as successful-request percentage.",
      "SLO is the internal target for the indicator.",
      "SLA is a contractual commitment and may have service credits or penalties.",
      "The internal SLO should normally provide a safety margin above the SLA."
    ],
    "layman": "The speedometer is the measurement, the target speed is the objective and the delivery contract is the agreement.",
    "usecases": [
      "99.95% internal SLO supporting a 99.9% contractual SLA."
    ],
    "code": "Interview focus:\n- SLI measures, SLO targets and SLA contracts.",
    "followups": [
      "Why is an SLO often stricter than an SLA?",
      "Which endpoints are in scope?"
    ],
    "redflags": [
      "Uses the terms interchangeably"
    ],
    "memory": "SLI measures, SLO targets and SLA contracts."
  },
  {
    "id": "calculate-availability",
    "title": "Calculate Availability Correctly",
    "category": "Production Readiness",
    "question": "How do you calculate availability correctly, and what availability SLO would you set?",
    "technical": [
      "Use successful valid user requests divided by total valid user requests over a defined window.",
      "Define included operations, failure statuses, timeout threshold, partial failure and maintenance treatment.",
      "Consider regional and tenant views and correctness, not only response status.",
      "A critical customer-facing API would normally target at least 99.9%, with separate latency and correctness SLOs backed by error budgets and burn-rate alerts."
    ],
    "layman": "Count whether customers completed the service, not whether the building’s power light was on.",
    "usecases": [
      "Subscription creation availability per region and month."
    ],
    "code": "Interview focus:\n- Availability is a clearly scoped user-outcome ratio.",
    "followups": [
      "Do 4xx responses count?",
      "What about a response that is successful but too slow?",
      "How much downtime does 95% permit?"
    ],
    "redflags": [
      "Measures process uptime only",
      "Calls 95% high availability"
    ],
    "memory": "Availability is a clearly scoped user-outcome ratio."
  },
  {
    "id": "error-budget",
    "title": "Error Budgets",
    "category": "Production Readiness",
    "question": "What is an error budget?",
    "technical": [
      "It is the acceptable unreliability derived from an SLO.",
      "Teams use it to balance feature velocity and reliability risk.",
      "Fast burn can page responders; an exhausted budget can restrict risky releases and prioritise resilience."
    ],
    "layman": "The error budget is the amount of failure the service can afford before it must stop taking additional risk.",
    "usecases": [
      "99.9% availability allows approximately 0.1% failed time or requests."
    ],
    "code": "Interview focus:\n- Error budgets translate an SLO into an operational release policy.",
    "followups": [
      "What policy follows budget exhaustion?",
      "How is burn rate alerted?"
    ],
    "redflags": [
      "Treats it as a financial budget"
    ],
    "memory": "Error budgets translate an SLO into an operational release policy."
  },
  {
    "id": "high-availability",
    "title": "High Availability Design",
    "category": "Production Readiness",
    "question": "How do you design for high availability?",
    "technical": [
      "Remove single points of failure with multiple instances, zones, health checks, load balancing and automated failover.",
      "Use stateless services where practical, durable queues, replicated data and capacity headroom.",
      "Test failures and document operational response."
    ],
    "layman": "Do not rely on one cashier, one power source or one delivery route.",
    "usecases": [
      "Regional multi-zone GKE service with an HA database."
    ],
    "code": "Interview focus:\n- High availability covers compute, data, dependencies and operations.",
    "followups": [
      "What happens during full-zone failure?",
      "Which component remains a singleton?"
    ],
    "redflags": [
      "Only adds application replicas",
      "No data-layer availability"
    ],
    "memory": "High availability covers compute, data, dependencies and operations."
  },
  {
    "id": "ha-dr",
    "title": "High Availability versus Disaster Recovery",
    "category": "Production Readiness",
    "question": "What is the difference between high availability and disaster recovery?",
    "technical": [
      "High availability keeps service operating through common component failures.",
      "Disaster recovery restores service after a major region, infrastructure or data-loss event.",
      "DR requires RTO/RPO, backups or replication, a secondary environment, runbooks and exercises."
    ],
    "layman": "HA keeps the shop open when one cashier fails; DR rebuilds operations after the whole building is lost.",
    "usecases": [
      "Multi-zone HA plus cross-region recovery plan."
    ],
    "code": "Interview focus:\n- HA prevents or masks common failure; DR restores after a disaster.",
    "followups": [
      "Can multi-zone survive regional failure?",
      "How often is DR exercised?"
    ],
    "redflags": [
      "Calls backups high availability",
      "No recovery testing"
    ],
    "memory": "HA prevents or masks common failure; DR restores after a disaster."
  },
  {
    "id": "rto-rpo",
    "title": "RTO and RPO",
    "category": "Production Readiness",
    "question": "Explain RTO and RPO.",
    "technical": [
      "RTO is the maximum acceptable time to restore service.",
      "RPO is the maximum acceptable amount of data loss, measured in time.",
      "Lower objectives require more cost and complexity."
    ],
    "layman": "RTO asks how long the shop may stay closed; RPO asks how many recent transactions may be lost.",
    "usecases": [
      "Two-hour RTO and fifteen-minute RPO."
    ],
    "code": "Interview focus:\n- RTO is recovery time; RPO is acceptable data-loss window.",
    "followups": [
      "Which workload needs near-zero RPO?",
      "How is the objective tested?"
    ],
    "redflags": [
      "Confuses the two"
    ],
    "memory": "RTO is recovery time; RPO is acceptable data-loss window."
  },
  {
    "id": "partial-dependency",
    "title": "Partial Dependency Failure",
    "category": "Production Readiness",
    "question": "How should an application handle partial dependency failure?",
    "technical": [
      "Use timeouts and circuit breakers while preserving the core user path.",
      "Return partial or cached results, disable non-critical functionality, queue work or use controlled read-only mode.",
      "Communicate degraded state and monitor recovery."
    ],
    "layman": "If the recommendation desk closes, the entire supermarket should not close; show popular products instead.",
    "usecases": [
      "Recommendation failure does not stop media playback."
    ],
    "code": "Interview focus:\n- Define graceful degradation for every non-critical dependency.",
    "followups": [
      "When is stale cache acceptable?",
      "Which functions are business-critical?"
    ],
    "redflags": [
      "All-or-nothing failure",
      "No degradation design"
    ],
    "memory": "Define graceful degradation for every non-critical dependency."
  },
  {
    "id": "config-management",
    "title": "Configuration Management",
    "category": "Production Readiness",
    "question": "How do you manage application configuration across environments?",
    "technical": [
      "Separate configuration from code, validate it at startup and version non-secret values.",
      "Store secrets in a dedicated manager and use managed identity.",
      "Audit changes and apply them through infrastructure or deployment automation rather than manual server edits."
    ],
    "layman": "Use controlled environment settings rather than handwritten changes inside every machine.",
    "usecases": [
      "Different endpoints and feature flags in development, testing and production."
    ],
    "code": "Interview focus:\n- Configuration should be validated, auditable and automated.",
    "followups": [
      "How is a missing setting detected?",
      "How are secrets rotated?"
    ],
    "redflags": [
      "Secrets in source code",
      "Manual production edits"
    ],
    "memory": "Configuration should be validated, auditable and automated."
  },
  {
    "id": "graceful-shutdown",
    "title": "Graceful Shutdown",
    "category": "Production Readiness",
    "question": "What is graceful shutdown?",
    "technical": [
      "Stop accepting new work and mark the instance unready.",
      "Complete or safely terminate in-flight requests and stop consuming new messages.",
      "Return unfinished messages, close connections, flush telemetry and exit within the platform grace period."
    ],
    "layman": "Close the shop door, finish serving customers already inside, secure the cash register and then switch off.",
    "usecases": [
      "Kubernetes Pod termination during a rolling deployment."
    ],
    "code": "Interview focus:\n- Graceful shutdown protects in-flight work during deployment and scale-down.",
    "followups": [
      "When is readiness changed?",
      "What happens to long-running jobs?"
    ],
    "redflags": [
      "Process exits immediately",
      "Continues accepting work"
    ],
    "memory": "Graceful shutdown protects in-flight work during deployment and scale-down."
  },
  {
    "id": "safe-release",
    "title": "Safe Feature Releases",
    "category": "Deployment",
    "question": "How do you release features safely?",
    "technical": [
      "Use feature flags, canary, blue-green, gradual traffic or tenant cohorts.",
      "Run smoke and synthetic checks and compare business and technical metrics with baseline.",
      "Define automated rollback and keep database changes backward-compatible.",
      "Assign feature-flag ownership and expiry."
    ],
    "layman": "Open the new ride to staff, then a small group, then everyone while keeping the old ride available.",
    "usecases": [
      "Release a checkout flow to 5% of tenants."
    ],
    "code": "Interview focus:\n- Safe releases limit blast radius and make reversal practical.",
    "followups": [
      "How are feature flags retired?",
      "Which metric blocks promotion?"
    ],
    "redflags": [
      "All users receive change at once",
      "No rollback"
    ],
    "memory": "Safe releases limit blast radius and make reversal practical."
  },
  {
    "id": "authn-authz",
    "title": "Authentication versus Authorisation",
    "category": "Security",
    "question": "What is the difference between authentication and authorisation?",
    "technical": [
      "Authentication proves who an identity is.",
      "Authorisation decides which resources and actions the identity may use.",
      "Every request needs server-side authorisation even after successful login."
    ],
    "layman": "Showing an ID proves who you are; the access list decides which rooms you may enter.",
    "usecases": [
      "A user is authenticated by SSO but authorised only in one tenant."
    ],
    "code": "Interview focus:\n- Authenticate identity and independently authorise every action.",
    "followups": [
      "Where is authorisation enforced?",
      "How do services authenticate each other?"
    ],
    "redflags": [
      "Login considered sufficient"
    ],
    "memory": "Authenticate identity and independently authorise every action."
  },
  {
    "id": "web-risks",
    "title": "Common Web Application Security Risks",
    "category": "Security",
    "question": "What are common web application security risks and controls?",
    "technical": [
      "Broken access control and IDOR (guessing or editing an ID in a request to reach another user's data), injection, XSS (a malicious script that runs inside another user's browser), CSRF (tricking a logged-in user's browser into submitting a request they never intended), authentication failure, SSRF (tricking the server itself into calling internal systems on the attacker's behalf), insecure configuration, vulnerable dependencies and data exposure.",
      "Use server-side authorisation, parameterised queries, output encoding, CSP, secure sessions, egress control, scanning and logging.",
      "Threat-model the actual system instead of only reciting names."
    ],
    "layman": "Attackers look for unlocked doors, forged forms, unsafe links and trusted staff who accept unverified instructions.",
    "usecases": [
      "Prevent cross-tenant invoice access and SSRF in URL-fetch features."
    ],
    "code": "Interview focus:\n- Security knowledge must connect threats to enforcement and testing.",
    "followups": [
      "Which risk is most likely in this design?",
      "How is it tested?"
    ],
    "redflags": [
      "Only lists OWASP terms",
      "No concrete controls"
    ],
    "memory": "Security knowledge must connect threats to enforcement and testing."
  },
  {
    "id": "secret-management",
    "title": "Secret Management",
    "category": "Security",
    "question": "How should secrets be managed?",
    "technical": [
      "Use Secret Manager or equivalent, not source control, images or ordinary configuration.",
      "Prefer workload identity and short-lived credentials.",
      "Apply least privilege, rotation, audit and environment separation.",
      "Redact logs and revoke accidental exposure immediately."
    ],
    "layman": "Keep keys in a guarded vault, not written on an office wall.",
    "usecases": [
      "GKE workload obtains a database secret through Secret Manager."
    ],
    "code": "Interview focus:\n- Use managed identity first and a dedicated vault for unavoidable secrets.",
    "followups": [
      "How is rotation performed without outage?",
      "What happens after a secret is committed?"
    ],
    "redflags": [
      "Long-lived static keys",
      "Secrets in ConfigMap or repository"
    ],
    "memory": "Use managed identity first and a dedicated vault for unavoidable secrets."
  },
  {
    "id": "api-abuse",
    "title": "Protect an API from Abuse",
    "category": "Security",
    "question": "How do you protect an API from abuse?",
    "technical": [
      "Authenticate, authorise, validate input and limit request sizes.",
      "Apply per-user or tenant quotas, rate and concurrency limits, timeouts, WAF or bot controls and replay or idempotency protection.",
      "Monitor anomalies and add cost controls for expensive operations."
    ],
    "layman": "A public service counter needs identity checks, queue limits, form validation and the ability to block abusive visitors.",
    "usecases": [
      "Protect an AI endpoint from token-cost abuse."
    ],
    "code": "Interview focus:\n- Protect API capacity, downstream systems and business cost.",
    "followups": [
      "Where is rate limiting enforced?",
      "How do service tiers differ?"
    ],
    "redflags": [
      "Only one global limit",
      "No cost protection"
    ],
    "memory": "Protect API capacity, downstream systems and business cost."
  },
  {
    "id": "admin-access",
    "title": "Administrative Access Control",
    "category": "Security",
    "question": "How should administrative access be controlled?",
    "technical": [
      "Use separate privileged identities, MFA and least privilege.",
      "Use just-in-time time-bound elevation, approval, audit and regular access review.",
      "Avoid shared accounts and maintain a monitored break-glass process."
    ],
    "layman": "Master keys are checked out temporarily, approved and recorded; they are not copied for everyone.",
    "usecases": [
      "Temporary production database access during an incident."
    ],
    "code": "Interview focus:\n- Privileged access should be temporary, approved, attributable and audited.",
    "followups": [
      "How is break-glass tested?",
      "Who reviews access?"
    ],
    "redflags": [
      "Shared administrator account",
      "Permanent broad access"
    ],
    "memory": "Privileged access should be temporary, approved, attributable and audited."
  },
  {
    "id": "logs-metrics-traces",
    "title": "Logs, Metrics and Traces",
    "category": "Observability",
    "question": "What is the difference between logs, metrics and traces?",
    "technical": [
      "Logs are detailed individual events.",
      "Metrics are aggregated numeric measurements over time.",
      "Traces follow one request across components.",
      "Use all three with shared service, version and trace context."
    ],
    "layman": "Logs are diary entries, metrics are dashboard gauges and traces are the route of one parcel through every station.",
    "usecases": [
      "Investigate a slow payment across API, queue and provider."
    ],
    "code": "Interview focus:\n- Logs explain events, metrics reveal patterns and traces show distributed flow.",
    "followups": [
      "Which is best for alerting?",
      "How are logs linked to traces?"
    ],
    "redflags": [
      "Treats the three as interchangeable"
    ],
    "memory": "Logs explain events, metrics reveal patterns and traces show distributed flow."
  },
  {
    "id": "what-to-log",
    "title": "What Should Be Logged",
    "category": "Observability",
    "question": "What should be logged, and what must not be logged?",
    "technical": [
      "Log timestamp, service and version, severity, trace ID, operation, result, duration and safe tenant context.",
      "Do not log passwords, tokens, keys, full payment details or unnecessary personal and confidential data.",
      "Use structured fields with retention and access controls."
    ],
    "layman": "Write enough to reconstruct what happened, but never copy the safe’s contents into the incident diary.",
    "usecases": [
      "Structured subscription API error log."
    ],
    "code": "Interview focus:\n- Logs must be useful, structured and safe.",
    "followups": [
      "How is PII redacted?",
      "How is high-volume logging sampled?"
    ],
    "redflags": [
      "Logs secrets",
      "Only unstructured text"
    ],
    "memory": "Logs must be useful, structured and safe."
  },
  {
    "id": "actionable-alerts",
    "title": "Actionable Alerts",
    "category": "Observability",
    "question": "What makes an alert actionable?",
    "technical": [
      "It indicates real or imminent user or business impact and requires human action.",
      "It has severity, owner, context, dashboard and runbook links and avoids duplicates.",
      "Alert on SLO burn, transaction failure or saturation rather than every exception."
    ],
    "layman": "An alarm should mean someone must act, not merely that a sensor noticed one harmless event.",
    "usecases": [
      "Payment failures exceed threshold for ten minutes."
    ],
    "code": "Interview focus:\n- Actionable alerts are impact-based, owned and linked to a response.",
    "followups": [
      "Who is paged?",
      "What is the false-positive rate?"
    ],
    "redflags": [
      "Every error pages",
      "No runbook"
    ],
    "memory": "Actionable alerts are impact-based, owned and linked to a response."
  },
  {
    "id": "post-incident",
    "title": "Post-Incident Review",
    "category": "Observability",
    "question": "What should a post-incident review contain?",
    "technical": [
      "Impact, timeline, detection, root cause, contributing factors and recovery.",
      "What worked and failed, with corrective actions, owners and due dates.",
      "Focus on system learning rather than individual blame."
    ],
    "layman": "After a fire, improve wiring, alarms and procedures instead of blaming the person nearest the switch.",
    "usecases": [
      "Database pool exhaustion review."
    ],
    "code": "Interview focus:\n- A review is complete only when learning becomes tracked system change.",
    "followups": [
      "Root cause versus contributing factor?",
      "How are actions tracked?"
    ],
    "redflags": [
      "No owners or deadlines",
      "Blame-focused review"
    ],
    "memory": "A review is complete only when learning becomes tracked system change."
  },
  {
    "id": "testing-strategy",
    "title": "Production Testing Strategy",
    "category": "Testing & Quality",
    "question": "What testing strategy should a production system have?",
    "technical": [
      "Use unit, component, integration, contract and targeted end-to-end tests.",
      "Add security, performance, resilience, migration, smoke and synthetic production checks.",
      "Balance confidence and execution speed; excessive end-to-end tests become slow and fragile."
    ],
    "layman": "Test parts, important connections, complete customer journeys and failure conditions.",
    "usecases": [
      "Subscription workflow with payment-provider integration."
    ],
    "code": "Interview focus:\n- A production test portfolio covers logic, integration, non-functional behaviour and deployment.",
    "followups": [
      "What belongs in end-to-end testing?",
      "How are third parties simulated?"
    ],
    "redflags": [
      "Only unit tests",
      "Only manual tests"
    ],
    "memory": "A production test portfolio covers logic, integration, non-functional behaviour and deployment."
  },
  {
    "id": "contract-testing",
    "title": "Contract Testing",
    "category": "Testing & Quality",
    "question": "What is contract testing?",
    "technical": [
      "It verifies that a service consumer and provider agree on request, response, fields, types and error behaviour.",
      "It catches breaking integration changes without requiring a complete end-to-end environment."
    ],
    "layman": "Both departments agree on the exact form and response before either changes its process.",
    "usecases": [
      "Subscription service verifies its contract with payment service."
    ],
    "code": "Interview focus:\n- Contract tests protect service compatibility at integration boundaries.",
    "followups": [
      "Who owns the contract?",
      "How are versions handled?"
    ],
    "redflags": [
      "Confuses it with unit testing"
    ],
    "memory": "Contract tests protect service compatibility at integration boundaries."
  },
  {
    "id": "test-multitenancy",
    "title": "Testing Multi-Tenancy",
    "category": "Testing & Quality",
    "question": "How do you test multi-tenancy?",
    "technical": [
      "Verify tenant A cannot read, update, delete, search, export or download tenant B data.",
      "Test caches, signed URLs, jobs, admin roles, search indexes and audit.",
      "Use identical-looking IDs or names across tenants to expose missing scoping."
    ],
    "layman": "Try every door with the wrong company badge, including hidden service doors and archive rooms.",
    "usecases": [
      "Automated negative tests for invoice and file access."
    ],
    "code": "Interview focus:\n- Multi-tenancy testing must cover every storage and processing path with negative cases.",
    "followups": [
      "How are async jobs tested?",
      "How are platform admins separated?"
    ],
    "redflags": [
      "Only tests successful access",
      "Assumes UUID secrecy"
    ],
    "memory": "Multi-tenancy testing must cover every storage and processing path with negative cases."
  },
  {
    "id": "performance-testing",
    "title": "Performance Testing",
    "category": "Testing & Quality",
    "question": "How do you performance-test an application?",
    "technical": [
      "Define realistic journeys, traffic shapes, data volume and NFRs.",
      "Test baseline, peak, stress and recovery with gradual ramp-up.",
      "Measure p50, p95, p99, errors, throughput, saturation, dependencies and autoscaling.",
      "Use production-like data and compare against explicit targets."
    ],
    "layman": "Test the road during normal traffic, rush hour and beyond capacity, then confirm it recovers.",
    "usecases": [
      "Load-test a Ramadan peak traffic profile."
    ],
    "code": "Interview focus:\n- Performance testing validates percentiles, capacity, bottlenecks and recovery.",
    "followups": [
      "What is the breaking point?",
      "How is the database represented realistically?"
    ],
    "redflags": [
      "Only average latency",
      "Empty or tiny test database"
    ],
    "memory": "Performance testing validates percentiles, capacity, bottlenecks and recovery."
  },
  {
    "id": "project-estimation",
    "title": "Software Project Estimation",
    "category": "Leadership",
    "question": "How do you estimate a software project?",
    "technical": [
      "Decompose requirements and state assumptions, dependencies and unknowns.",
      "Include NFRs, security, testing, migration, environments, CI/CD, documentation and support.",
      "Use historical data and discovery or spikes for high uncertainty and expose ranges and contingency."
    ],
    "layman": "Estimate permits, foundations, inspections and maintenance, not only construction time.",
    "usecases": [
      "Estimate a cloud migration or AI-integration project."
    ],
    "code": "Interview focus:\n- A credible estimate includes delivery, quality, operations and uncertainty.",
    "followups": [
      "Which uncertainty dominates?",
      "What is explicitly excluded?"
    ],
    "redflags": [
      "Only estimates coding days",
      "No risk allowance"
    ],
    "memory": "A credible estimate includes delivery, quality, operations and uncertainty."
  },
  {
    "id": "speed-quality",
    "title": "Balance Delivery Speed and Quality",
    "category": "Leadership",
    "question": "How should a Tech Lead balance delivery speed and quality?",
    "technical": [
      "Set non-negotiable security and reliability controls and automate them.",
      "Reduce scope or use controlled rollout rather than silently lowering quality.",
      "Distinguish reversible decisions from hard-to-reverse decisions.",
      "Accept technical debt only with explicit risk, owner and remediation plan."
    ],
    "layman": "Deliver fewer safe features rather than a larger unsafe package.",
    "usecases": [
      "Ship the core workflow behind feature flags and defer non-essential features."
    ],
    "code": "Interview focus:\n- Balance speed through scope, automation and reversible delivery—not hidden risk.",
    "followups": [
      "Which controls are non-negotiable?",
      "How is debt recorded?"
    ],
    "redflags": [
      "Quality always sacrificed for the date",
      "Gold-plates every change"
    ],
    "memory": "Balance speed through scope, automation and reversible delivery—not hidden risk."
  },
  {
    "id": "developer-quality",
    "title": "Repeated Poor-Quality Delivery",
    "category": "Leadership",
    "question": "How do you handle a developer who repeatedly delivers poor-quality code?",
    "technical": [
      "Use concrete examples and determine whether the cause is skill, clarity, workload or motivation.",
      "Set measurable expectations and provide pairing, training and review support.",
      "Review progress and document persistent performance concerns; escalate appropriately if improvement does not occur."
    ],
    "layman": "Diagnose whether the worker lacks training, tools or clarity before deciding the response.",
    "usecases": [
      "Improve API error handling and testing over a defined period."
    ],
    "code": "Interview focus:\n- Coach with evidence and expectations, then use the performance process if needed.",
    "followups": [
      "What evidence is used?",
      "How long is the improvement plan?"
    ],
    "redflags": [
      "Public blame",
      "Lead silently rewrites all work"
    ],
    "memory": "Coach with evidence and expectations, then use the performance process if needed."
  },
  {
    "id": "lead-bottleneck",
    "title": "Avoid the Tech Lead Bottleneck",
    "category": "Leadership",
    "question": "How do you prevent the Tech Lead from becoming a bottleneck?",
    "technical": [
      "Delegate domain ownership and develop senior engineers.",
      "Document principles and decisions and automate routine quality controls.",
      "Use structured design reviews and clear escalation instead of reviewing every change.",
      "Promote shared knowledge and rotate operational responsibility."
    ],
    "layman": "The lead designs the system and develops supervisors; they do not personally inspect every screw forever.",
    "usecases": [
      "Domain leads own identity, billing and data components."
    ],
    "code": "Interview focus:\n- A Tech Lead scales through standards, automation and capable owners.",
    "followups": [
      "Which decisions still require the Tech Lead?",
      "How is consistency maintained?"
    ],
    "redflags": [
      "Every PR requires one person",
      "No delegation"
    ],
    "memory": "A Tech Lead scales through standards, automation and capable owners."
  },
  {
    "id": "engineering-metrics",
    "title": "Engineering Effectiveness Metrics",
    "category": "Leadership",
    "question": "What metrics would you use to evaluate engineering effectiveness?",
    "technical": [
      "Use deployment frequency, change lead time, change-failure rate and MTTR.",
      "Add escaped defects, SLO attainment, vulnerability age, PR cycle time, build reliability and cost per transaction.",
      "Use team and system outcomes; avoid lines of code, commits and individual story points as productivity measures."
    ],
    "layman": "Measure how reliably the factory delivers useful products, not how many hammer swings each worker makes.",
    "usecases": [
      "DORA metrics plus reliability, security and cost indicators."
    ],
    "code": "Interview focus:\n- Measure flow, quality, reliability, security and business outcomes.",
    "followups": [
      "How can each metric be gamed?",
      "Which business outcome does it support?"
    ],
    "redflags": [
      "Ranks individuals by commits",
      "Uses story points as productivity"
    ],
    "memory": "Measure flow, quality, reliability, security and business outcomes."
  },
  {
    "id": "firestore-postgres",
    "title": "Firestore versus PostgreSQL",
    "category": "Data & Databases",
    "question": "Compare Firestore and PostgreSQL for a production-grade application. How does this generalise to choosing between SQL and NoSQL?",
    "technical": [
      "Firestore is a managed document database with flexible schema, real-time listeners and query patterns that should be designed in advance.",
      "PostgreSQL is relational and supports rich SQL, joins, constraints and strong ACID workflows.",
      "Use PostgreSQL for payments, subscriptions and relational consistency; use Firestore for document-oriented real-time state when its access model fits.",
      "Compare transactions, indexes, scale, tenant isolation, analytics and cost rather than saying one is faster.",
      "In general, choose SQL for relational constraints, joins and transactions; choose NoSQL for specific document or key access patterns and horizontal scale, accepting denormalisation and application-enforced rules."
    ],
    "layman": "Firestore is a flexible document cabinet; PostgreSQL is a structured ledger with enforced relationships and rules.",
    "usecases": [
      "Subscriptions in PostgreSQL and flexible user preferences in Firestore."
    ],
    "code": "Interview focus:\n- Choose from data relationships, consistency, query patterns and operational model.",
    "followups": [
      "How is tenant isolation enforced?",
      "How are ad-hoc reports handled?",
      "Can both be used?",
      "What is the most important query?",
      "Which rule must the database enforce?"
    ],
    "redflags": [
      "Firestore always faster",
      "PostgreSQL cannot scale",
      "No transaction discussion"
    ],
    "memory": "Choose from data relationships, consistency, query patterns and operational model."
  },
  {
    "id": "large-upload",
    "title": "Large File Upload",
    "category": "File & Media Processing",
    "question": "Design a production-grade upload for files of 20 GB or more over unreliable networks.",
    "technical": [
      "Create an authorised upload session and issue a short-lived resumable or signed URL for direct object-storage upload.",
      "Record tenant, expected metadata, quota, state and expiry and verify size, checksum, signature and content type.",
      "Quarantine and malware-scan files and protect against archive or decompression bombs.",
      "Trigger idempotent asynchronous processing and use lifecycle rules for abandoned uploads."
    ],
    "layman": "The user sends the large parcel directly to the warehouse with a temporary authorised delivery ticket instead of carrying it through reception.",
    "usecases": [
      "Large video, PDF archive or dataset upload to Cloud Storage."
    ],
    "code": "Interview focus:\n- Large uploads should be direct, resumable, validated, quarantined and asynchronous.",
    "followups": [
      "How is resume supported?",
      "What if the completion event is duplicated?",
      "How are orphan uploads cleaned?"
    ],
    "redflags": [
      "Streams entire file through application server",
      "No quarantine or checksum",
      "Public bucket"
    ],
    "memory": "Large uploads should be direct, resumable, validated, quarantined and asynchronous."
  },
  {
    "id": "blue-green",
    "title": "Blue-Green Deployment",
    "category": "Deployment",
    "question": "Explain blue-green deployment and how to handle traffic, database changes, sessions, workers and rollback.",
    "technical": [
      "Maintain two production-capable environments: current blue and new green.",
      "Deploy and validate green, then switch traffic while retaining blue for rapid reversal.",
      "Use backward-compatible expand-and-contract database changes because both versions may share data.",
      "Externalise sessions and prevent both versions from running duplicate scheduled or queue jobs.",
      "Rollback may be unsafe after irreversible data changes."
    ],
    "layman": "Prepare a second working shop, test it, redirect customers and keep the old shop ready until confidence is high.",
    "usecases": [
      "Release a new API version with near-instant traffic reversal."
    ],
    "code": "Interview focus:\n- Blue-green makes application rollback fast only when state remains compatible.",
    "followups": [
      "How are WebSockets handled?",
      "When is blue-green unsuitable?",
      "How are duplicate workers prevented?"
    ],
    "redflags": [
      "Only changes DNS",
      "No database strategy",
      "Deletes blue immediately"
    ],
    "memory": "Blue-green makes application rollback fast only when state remains compatible."
  },
  {
    "id": "scenario-tenant-leak",
    "title": "Scenario: Cross-Tenant Invoice Leak",
    "category": "Scenario Exercise",
    "question": "A customer reports that one user briefly saw another organisation’s invoice. What do you do?",
    "technical": [
      "Declare a critical security incident and disable or isolate the affected path.",
      "Preserve evidence, determine scope and revoke exposed links or sessions.",
      "Engage security, privacy and legal processes and meet notification obligations.",
      "Fix the isolation defect, search for similar paths, add tests and complete a security review."
    ],
    "layman": "Treat confidential information delivered to the wrong customer as an emergency, not a normal bug.",
    "usecases": [
      "Production SaaS data-exposure incident."
    ],
    "code": "Interview focus:\n- Contain, scope, notify, remediate and prevent recurrence.",
    "followups": [
      "How is the affected population determined?",
      "What evidence must be preserved?"
    ],
    "redflags": [
      "Only fixes one query",
      "No security or legal engagement"
    ],
    "memory": "Contain, scope, notify, remediate and prevent recurrence."
  },
  {
    "id": "scenario-latency",
    "title": "Scenario: Latency Regression after Deployment",
    "category": "Scenario Exercise",
    "question": "API p95 latency increases from 300 ms to eight seconds after a deployment. What do you do?",
    "technical": [
      "Confirm impact and correlate it with deployment timing.",
      "Check error rate, saturation, traces, dependencies, database queries, connection pools and cache.",
      "Roll back or disable the change when impact is material.",
      "Verify recovery, reproduce the issue and add regression or performance controls."
    ],
    "layman": "Return to the last safe version before spending a long time diagnosing while customers remain blocked.",
    "usecases": [
      "A release introduces a table scan and pool exhaustion."
    ],
    "code": "Interview focus:\n- Mitigate first, then diagnose and prevent the regression.",
    "followups": [
      "What evidence justifies rollback?",
      "How is complete recovery verified?"
    ],
    "redflags": [
      "Keeps debugging for hours before mitigation"
    ],
    "memory": "Mitigate first, then diagnose and prevent the regression."
  },
  {
    "id": "scenario-noisy",
    "title": "Scenario: Noisy Tenant Import",
    "category": "Scenario Exercise",
    "question": "A large tenant starts importing millions of records and affects every customer. What do you do?",
    "technical": [
      "Throttle the tenant and separate interactive traffic from batch work.",
      "Use asynchronous queueing, tenant quotas and concurrency limits and reserve capacity for critical paths.",
      "Monitor cost and backlog and move exceptional tenants to dedicated infrastructure when justified."
    ],
    "layman": "Move one customer’s bulk delivery to a separate loading bay so the main entrance remains usable.",
    "usecases": [
      "Large multi-tenant data import."
    ],
    "code": "Interview focus:\n- Protect fairness through workload separation and tenant-level controls.",
    "followups": [
      "How is progress exposed?",
      "What commercial tier applies?"
    ],
    "redflags": [
      "Only scales the shared database"
    ],
    "memory": "Protect fairness through workload separation and tenant-level controls."
  },
  {
    "id": "scenario-db-migration",
    "title": "Scenario: Partial Database Migration Failure",
    "category": "Scenario Exercise",
    "question": "A deployment completes, but the database migration fails halfway. What do you do?",
    "technical": [
      "Stop further rollout and inspect the exact migration state.",
      "Do not blindly rerun; determine transactional boundaries and integrity.",
      "Use resumable versioned migration, compatible application versions and roll-forward when rollback is unsafe.",
      "Validate data and improve pre-deployment migration testing."
    ],
    "layman": "Do not restart a half-completed construction job without checking which walls already moved.",
    "usecases": [
      "A large backfill fails after partial completion."
    ],
    "code": "Interview focus:\n- Partial migration recovery requires state inspection, compatibility and safe continuation.",
    "followups": [
      "Was the migration transactional?",
      "Can the old application read the new schema?"
    ],
    "redflags": [
      "Immediate rollback without data assessment"
    ],
    "memory": "Partial migration recovery requires state inspection, compatibility and safe continuation."
  },
  {
    "id": "scenario-knowledge-assistant",
    "title": "Scenario: Multi-Tenant Knowledge Assistant",
    "category": "Scenario Exercise",
    "question": "Design a knowledge assistant for 100 organisations and 50,000 users with citations, audit and 99.9% availability.",
    "technical": [
      "Cover requirements, ingestion, OCR and parsing, chunking, retrieval, ACLs, generation, security, reliability, LLMOps, operations and cost.",
      "Handle malicious documents, model latency, embedding reindexing, deletion, cross-tenant leaks, cost increases and queue backlog.",
      "Show failure boundaries, metrics and recovery."
    ],
    "layman": "Design the intelligent librarian, locked archives, audit desk, emergency procedures and budget controls.",
    "usecases": [
      "Forty-five-minute whiteboard exercise."
    ],
    "code": "Interview focus:\n- A lead-level design includes failures, governance, operations and cost.",
    "followups": [
      "Where is authorisation enforced?",
      "How is reindexing performed without downtime?"
    ],
    "redflags": [
      "Happy-path architecture only"
    ],
    "memory": "A lead-level design includes failures, governance, operations and cost."
  },
  {
    "id": "scenario-code-review",
    "title": "Scenario: Production-Readiness Code Review",
    "category": "Scenario Exercise",
    "question": "Review a queue consumer with no idempotency, unlimited retries, early acknowledgement, secrets in config, no timeout, no transaction, unbounded concurrency and weak logging.",
    "technical": [
      "Group findings under correctness, reliability, security, operability, scalability, consistency, deployment and testing.",
      "Prioritise early acknowledgement, duplicate side effects, secret exposure and unbounded failure amplification.",
      "Add durable idempotency, transactional state or outbox, bounded retries and DLQ, timeouts, backpressure, graceful shutdown and observability."
    ],
    "layman": "Review the machine by safety category and fix the faults most likely to harm customers first.",
    "usecases": [
      "Node.js or Python Pub/Sub consumer review exercise."
    ],
    "code": "Interview focus:\n- Lead-level review prioritises business correctness and failure containment.",
    "followups": [
      "Which issue has the highest blast radius?",
      "What must be fixed before production?"
    ],
    "redflags": [
      "Lists code style before correctness and security"
    ],
    "memory": "Lead-level review prioritises business correctness and failure containment."
  },
  {
    "id": "ai-kit-001",
    "title": "Bias–Variance Trade-off",
    "category": "Math, Probability & Statistics",
    "question": "Explain the bias-variance tradeoff. How does it show up as underfitting vs. overfitting, and how do you manage it in practice?",
    "technical": [
      "Bias is systematic error from an overly simple model; variance is sensitivity to the particular training sample.",
      "High bias appears as underfitting: both training and validation performance are poor. High variance appears as overfitting: training performance is strong but validation performance degrades.",
      "Manage bias with richer features/models and better optimisation. Manage variance with more data, regularisation, simpler models, pruning, dropout, ensembling and cross-validation.",
      "Choose the operating point using validation performance and business cost, not training accuracy alone."
    ],
    "layman": "A model can be too rigid to learn the pattern or so flexible that it memorises every training example.",
    "usecases": [
      "Selecting model complexity for fraud detection",
      "Choosing tree depth or regularisation strength"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q1\n\nExample:\nA shallow tree misses fraud patterns (high bias).\nA fully grown tree memorises training cases (high variance).\nCross-validation helps select a middle depth.",
    "followups": [
      "How would learning curves reveal bias or variance?",
      "Why can bagging reduce variance?"
    ],
    "redflags": [
      "Defines bias as unfairness",
      "Uses the test set repeatedly for tuning"
    ],
    "memory": "Underfit = high bias; overfit = high variance; validation data finds the balance."
  },
  {
    "id": "ai-kit-002",
    "title": "Bayes' Theorem",
    "category": "Math, Probability & Statistics",
    "question": "State Bayes' theorem and walk through a practical example (e.g., spam filtering or medical test false positives).",
    "technical": [
      "Bayes' theorem updates a prior belief after observing evidence: P(A|B) = P(B|A)P(A)/P(B).",
      "The prior is the base rate, the likelihood describes how probable the evidence is under the hypothesis, and the posterior is the updated probability.",
      "Base rates matter: even a highly accurate test can produce many false positives when the condition is rare."
    ],
    "layman": "Start with what was likely before the evidence, then update it according to how strongly the evidence supports each possibility.",
    "usecases": [
      "Spam filtering",
      "Medical-test interpretation",
      "Fraud risk after a suspicious event"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q2\n\nMedical example:\nPrevalence = 1%, sensitivity = 99%, false-positive rate = 5%.\nAmong 10,000 people: about 99 true positives and 495 false positives.\nA positive result therefore does not mean a 99% chance of disease.",
    "followups": [
      "What is the base-rate fallacy?",
      "How does Naive Bayes use the theorem?"
    ],
    "redflags": [
      "Ignores prior probability",
      "Says test accuracy equals posterior probability"
    ],
    "memory": "Posterior = prior updated by evidence; never ignore the base rate."
  },
  {
    "id": "ai-kit-003",
    "title": "Probability vs. Likelihood",
    "category": "Math, Probability & Statistics",
    "question": "What is the difference between probability and likelihood?",
    "technical": [
      "Probability treats model parameters as fixed and asks how probable different data outcomes are.",
      "Likelihood treats observed data as fixed and compares how well different parameter values explain it.",
      "The same mathematical expression can be read differently depending on what is considered variable. Maximum-likelihood estimation chooses parameters that maximise the observed-data likelihood."
    ],
    "layman": "Probability asks, “Given this coin, what data might I see?” Likelihood asks, “Given these flips, which coin bias best explains them?”",
    "usecases": [
      "Estimating a Bernoulli probability",
      "Fitting logistic-regression parameters"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q3\n\nExample:\nP(7 heads | p=0.6) is a probability of data.\nL(p | 7 heads, 3 tails) is a function comparing candidate values of p.",
    "followups": [
      "Is likelihood a probability distribution over parameters?",
      "How does maximum likelihood relate to cross-entropy?"
    ],
    "redflags": [
      "Says they are identical without explaining the viewpoint",
      "Assumes likelihood must sum to one over parameters"
    ],
    "memory": "Probability varies data; likelihood varies parameters for fixed observed data."
  },
  {
    "id": "ai-kit-004",
    "title": "P-values and Statistical Significance",
    "category": "Math, Probability & Statistics",
    "question": "What is a p-value? What does p < 0.05 actually mean - and what does it NOT mean?",
    "technical": [
      "A p-value is the probability, assuming the null hypothesis and model assumptions are true, of observing a result at least as extreme as the one obtained.",
      "p < 0.05 does not mean there is a 95% probability the alternative is true, nor that the effect is large or practically important.",
      "Interpret it with effect size, confidence intervals, study design, multiple-testing correction and prior evidence."
    ],
    "layman": "It measures how surprising the result would be if there were truly no effect; it does not directly tell you the chance that your conclusion is correct.",
    "usecases": [
      "A/B test analysis",
      "Clinical or model-comparison experiments"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q4\n\nExample:\nA tiny latency improvement can have p < 0.05 with millions of observations but still be operationally irrelevant.",
    "followups": [
      "What happens when many hypotheses are tested?",
      "Difference between statistical and practical significance?"
    ],
    "redflags": [
      "Says p=0.03 means 97% chance the hypothesis is true",
      "Ignores effect size"
    ],
    "memory": "A p-value is evidence under the null, not the probability that the null is true."
  },
  {
    "id": "ai-kit-005",
    "title": "Central Limit Theorem",
    "category": "Math, Probability & Statistics",
    "question": "Explain the Central Limit Theorem and why it is so important in statistics and ML.",
    "technical": [
      "For many independent, identically distributed samples with finite variance, the distribution of the sample mean approaches a normal distribution as sample size grows.",
      "Its mean equals the population mean and its standard error shrinks approximately as σ/√n.",
      "It supports confidence intervals and many hypothesis tests even when the raw population is not normal, subject to assumptions and sufficient sample size."
    ],
    "layman": "Average many independent observations and the averages tend to form a bell-shaped distribution.",
    "usecases": [
      "Confidence intervals for model latency",
      "A/B test differences in means"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q5\n\nExample:\nIndividual request latency may be skewed, but repeated sample means can be approximately normal when samples are large and independent.",
    "followups": [
      "When does CLT fail or converge slowly?",
      "Does it say the original data becomes normal?"
    ],
    "redflags": [
      "Says all data becomes normally distributed",
      "Ignores dependence or heavy tails"
    ],
    "memory": "CLT concerns the sampling distribution of averages, not the original data distribution."
  },
  {
    "id": "ai-kit-006",
    "title": "Type I and Type II Errors",
    "category": "Math, Probability & Statistics",
    "question": "What are Type I and Type II errors? Give a real-world example where each one is more costly.",
    "technical": [
      "Type I error is a false positive: rejecting a true null hypothesis. Its rate is controlled by α.",
      "Type II error is a false negative: failing to reject a false null hypothesis. Statistical power is 1 − β.",
      "The preferred trade-off depends on business harm, prevalence, threshold and the cost of review."
    ],
    "layman": "A smoke alarm can ring with no fire, or stay silent during a real fire. Which mistake is worse depends on the setting.",
    "usecases": [
      "Fraud detection",
      "Medical screening",
      "Security-alert thresholds"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q6\n\nExample:\nFraud: blocking a legitimate payment is Type I; missing actual fraud is Type II.\nA bank may use a sensitive first-stage detector and human review to reduce both harms.",
    "followups": [
      "How does sample size affect power?",
      "How would you choose a threshold from costs?"
    ],
    "redflags": [
      "Confuses false positive with incorrect positive prediction only, without null context",
      "Optimises one error without business context"
    ],
    "memory": "Type I = false alarm; Type II = missed real effect."
  },
  {
    "id": "ai-kit-007",
    "title": "Correlation, Covariance and Causation",
    "category": "Math, Probability & Statistics",
    "question": "Differentiate correlation, covariance, and causation. Why doesn't correlation imply causation?",
    "technical": [
      "Covariance measures whether two variables move together and retains scale units.",
      "Correlation standardises covariance to a dimensionless value, commonly between −1 and 1 for Pearson correlation.",
      "Causation requires evidence that changing one variable changes the other, while ruling out confounding, reverse causality and coincidence.",
      "Use controlled experiments or credible causal-inference designs when causal claims matter."
    ],
    "layman": "Two umbrellas and wet roads move together because rain causes both; umbrellas do not cause the road to become wet.",
    "usecases": [
      "Feature analysis",
      "A/B experiments",
      "Causal impact assessment"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q7\n\nExample:\nIce-cream sales and drowning incidents correlate because hot weather raises both.",
    "followups": [
      "Can zero correlation still hide a relationship?",
      "How would a randomised test establish causality?"
    ],
    "redflags": [
      "Treats correlation as proof of causation",
      "Ignores nonlinear relationships"
    ],
    "memory": "Correlation describes association; causation explains intervention and effect."
  },
  {
    "id": "ai-kit-008",
    "title": "Supervised, Unsupervised and Reinforcement Learning",
    "category": "Classical Machine Learning",
    "question": "Explain supervised, unsupervised, and reinforcement learning with one real example of each.",
    "technical": [
      "Supervised learning learns a mapping from labelled inputs to targets.",
      "Unsupervised learning discovers structure in unlabelled data, such as clusters or lower-dimensional representations.",
      "Reinforcement learning learns a policy through actions, rewards and delayed consequences in an environment."
    ],
    "layman": "Supervised learning studies with answer keys, unsupervised learning groups material without answers, and reinforcement learning improves through rewards and penalties.",
    "usecases": [
      "Email classification",
      "Customer segmentation",
      "Robot or game policy learning"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q8\n\nExamples:\nSupervised: predict fraud from labelled transactions.\nUnsupervised: cluster customers by behaviour.\nRL: choose actions to maximise long-term delivery efficiency.",
    "followups": [
      "Where does self-supervised learning fit?",
      "Why is offline RL difficult?"
    ],
    "redflags": [
      "Calls clustering supervised",
      "Describes RL as ordinary classification"
    ],
    "memory": "Labels teach supervised models; structure guides unsupervised models; reward guides RL."
  },
  {
    "id": "ai-kit-009",
    "title": "Logistic vs. Linear Regression",
    "category": "Classical Machine Learning",
    "question": "How does logistic regression differ from linear regression? Why can't we use plain linear regression for classification?",
    "technical": [
      "Linear regression predicts a continuous value by modelling a linear conditional mean.",
      "Logistic regression models the log-odds of a class and maps the score through a sigmoid to a probability between zero and one.",
      "Plain linear regression is unsuitable for classification because predictions are unbounded, residual assumptions do not fit Bernoulli outcomes and its loss is poorly aligned with class probability.",
      "Logistic regression is trained using log loss or maximum likelihood."
    ],
    "layman": "Linear regression predicts an amount; logistic regression predicts the chance of a yes/no outcome.",
    "usecases": [
      "House-price prediction versus fraud probability"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q9\n\nExample:\nLinear: predicted revenue = £250.\nLogistic: probability of churn = 0.82, then apply a decision threshold.",
    "followups": [
      "What does a logistic coefficient mean?",
      "How do class weights affect training?"
    ],
    "redflags": [
      "Says logistic regression is a non-linear black box",
      "Uses 0.5 threshold without business analysis"
    ],
    "memory": "Linear predicts continuous values; logistic predicts class probabilities via log-odds."
  },
  {
    "id": "ai-kit-010",
    "title": "Detect and Prevent Overfitting",
    "category": "Classical Machine Learning",
    "question": "How do you detect overfitting, and what techniques do you use to prevent it (regularization, cross-validation, early stopping)?",
    "technical": [
      "Compare training and validation curves; a widening generalisation gap suggests overfitting.",
      "Use cross-validation, regularisation, simpler models, data augmentation, feature selection, early stopping, dropout or pruning.",
      "Prevent data leakage and tune on validation data while reserving the test set for final unbiased assessment.",
      "Learning curves help determine whether more data is likely to help."
    ],
    "layman": "The model has memorised practice questions but performs poorly on a new exam.",
    "usecases": [
      "Model selection for a limited labelled dataset"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q10\n\nExample:\nTraining loss keeps falling while validation loss begins rising; stop at the best validation checkpoint.",
    "followups": [
      "How do you distinguish overfitting from distribution shift?",
      "What does high training error indicate?"
    ],
    "redflags": [
      "Tunes repeatedly on the test set",
      "Only response is collect more data"
    ],
    "memory": "Overfitting is a validation gap; fix capacity, data, leakage and regularisation."
  },
  {
    "id": "ai-kit-011",
    "title": "Random Forest vs. Gradient Boosting",
    "category": "Classical Machine Learning",
    "question": "Compare Random Forest and Gradient Boosting (e.g., XGBoost). How does bagging differ from boosting?",
    "technical": [
      "Random Forest uses bagging: many trees train independently on bootstrapped data and random feature subsets, then average or vote. It mainly reduces variance.",
      "Gradient boosting trains trees sequentially so each new tree corrects residual errors. It can achieve high accuracy but is more sensitive to tuning, noise and overfitting.",
      "Random Forest parallelises easily and is robust; boosted trees often win on structured/tabular data with careful validation."
    ],
    "layman": "Random Forest asks many independent experts and averages them. Boosting lets each new expert study the previous team’s mistakes.",
    "usecases": [
      "Tabular risk scoring",
      "Customer churn prediction"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q11\n\nExample:\nUse Random Forest for a stable baseline; use XGBoost with tuned depth, learning rate and early stopping for stronger ranking performance.",
    "followups": [
      "What is the role of learning rate?",
      "How do out-of-bag estimates work?"
    ],
    "redflags": [
      "Says boosting trains trees independently",
      "Assumes one always dominates"
    ],
    "memory": "Bagging averages independent models; boosting sequentially corrects errors."
  },
  {
    "id": "ai-kit-012",
    "title": "K-means Clustering",
    "category": "Classical Machine Learning",
    "question": "How does k-means clustering work? How do you choose the right value of k?",
    "technical": [
      "K-means alternates between assigning each point to the nearest centroid and recomputing centroids until convergence.",
      "It minimises within-cluster squared distance and works best for roughly spherical, similarly scaled clusters.",
      "Standardise features, run multiple initialisations and choose k using domain needs, elbow/silhouette analysis and stability—not one metric alone.",
      "It is sensitive to outliers and initialisation."
    ],
    "layman": "Place k meeting points, send each person to the nearest one, move each point to the centre of its group, and repeat.",
    "usecases": [
      "Customer behavioural segmentation",
      "Document-embedding exploration"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q12\n\nExample:\nCompare k=3 to k=8 using silhouette score and whether resulting customer groups support distinct actions.",
    "followups": [
      "Why does feature scaling matter?",
      "When would DBSCAN be better?"
    ],
    "redflags": [
      "Claims k-means finds arbitrary shapes",
      "Uses elbow plot mechanically"
    ],
    "memory": "K-means alternates assignment and centroid update; k must make statistical and business sense."
  },
  {
    "id": "ai-kit-013",
    "title": "Learning with Imbalanced Data",
    "category": "Classical Machine Learning",
    "question": "Your dataset is highly imbalanced (e.g., 1% fraud). How do you handle it - resampling, class weights, and which metrics do you use?",
    "technical": [
      "Use stratified splits and metrics that expose minority-class performance: precision, recall, F1, PR-AUC and cost-weighted outcomes.",
      "Try class weights, threshold tuning, over/under-sampling or carefully applied synthetic sampling.",
      "Evaluate calibration and performance by subgroup; prevent temporal or entity leakage.",
      "Choose the threshold from the cost of false positives and false negatives."
    ],
    "layman": "When only 1 in 100 cases is fraud, a model that always says “not fraud” is 99% accurate but useless.",
    "usecases": [
      "Fraud, defect or rare-disease detection"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q13\n\nExample:\nTrain with class weights, report PR-AUC, and select a threshold that catches 90% of fraud within the review team’s capacity.",
    "followups": [
      "Why is PR-AUC often more useful than ROC-AUC here?",
      "What risk does SMOTE introduce?"
    ],
    "redflags": [
      "Reports accuracy only",
      "Balances data before splitting and causes leakage"
    ],
    "memory": "For rare positives, use minority-aware metrics and cost-based thresholds."
  },
  {
    "id": "ai-kit-014",
    "title": "L1 vs. L2 Regularisation",
    "category": "Classical Machine Learning",
    "question": "What is the difference between L1 (Lasso) and L2 (Ridge) regularization? Why does L1 produce sparse models?",
    "technical": [
      "L1 adds the absolute value of coefficients and tends to drive some exactly to zero, producing sparse feature selection.",
      "L2 adds squared coefficients and shrinks them smoothly without usually making them exactly zero.",
      "L1 can be unstable with correlated features; L2 often distributes weight among them. Elastic Net combines both.",
      "Regularisation strength must be selected on validation data after feature scaling."
    ],
    "layman": "L1 removes some tools from the toolbox; L2 keeps all tools but limits how strongly each can be used.",
    "usecases": [
      "Sparse high-dimensional text features",
      "Stabilising correlated tabular predictors"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q14\n\nObjective examples:\nL1: loss + λΣ|wᵢ|\nL2: loss + λΣwᵢ²",
    "followups": [
      "Why does geometry create sparsity?",
      "When would Elastic Net help?"
    ],
    "redflags": [
      "Says L1 is always better for feature selection",
      "Ignores scaling"
    ],
    "memory": "L1 creates sparsity; L2 smoothly shrinks coefficients."
  },
  {
    "id": "ai-kit-015",
    "title": "Backpropagation",
    "category": "Deep Learning & Neural Networks",
    "question": "Explain backpropagation intuitively. What is actually being computed and updated?",
    "technical": [
      "A forward pass computes predictions and loss.",
      "Backpropagation applies the chain rule from the loss backwards through the computation graph to obtain each parameter’s gradient.",
      "An optimiser uses those gradients to update parameters in a direction expected to reduce loss.",
      "Automatic differentiation performs the bookkeeping; backprop is gradient computation, not the optimiser itself."
    ],
    "layman": "The network sees its final error, traces how much each internal decision contributed, and adjusts those decisions slightly.",
    "usecases": [
      "Training neural classifiers or Transformers"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q15\n\nExample:\nforward → loss → gradients ∂loss/∂weight → optimiser step → repeat over batches.",
    "followups": [
      "Why are activations cached in the forward pass?",
      "Difference between backprop and gradient descent?"
    ],
    "redflags": [
      "Says errors are literally sent as labels to each layer",
      "Confuses optimiser with backprop"
    ],
    "memory": "Forward computes loss; backward computes gradients; optimiser updates weights."
  },
  {
    "id": "ai-kit-016",
    "title": "Vanishing and Exploding Gradients",
    "category": "Deep Learning & Neural Networks",
    "question": "What are vanishing and exploding gradients? What causes them and how do we fix them (ReLU, residual connections, normalization, clipping)?",
    "technical": [
      "Repeated multiplication through deep or recurrent networks can shrink gradients toward zero or grow them uncontrollably.",
      "Vanishing gradients slow learning in early layers; exploding gradients cause instability, NaNs or huge updates.",
      "Mitigations include suitable initialisation, ReLU/GELU, residual connections, normalisation, gated recurrent units and gradient clipping.",
      "Monitor gradient norms and activation distributions."
    ],
    "layman": "A message passed through many people may fade to a whisper or become exaggerated into a shout.",
    "usecases": [
      "Training deep networks and long-sequence RNNs"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q16\n\nExample:\nClip global gradient norm to a configured threshold while also addressing root causes with residual architecture and normalisation.",
    "followups": [
      "Why do residual connections help?",
      "Does clipping solve vanishing gradients?"
    ],
    "redflags": [
      "Only mentions smaller learning rate",
      "No monitoring of gradient norms"
    ],
    "memory": "Stable deep learning needs controlled signal and gradient flow."
  },
  {
    "id": "ai-kit-017",
    "title": "Activation Functions",
    "category": "Deep Learning & Neural Networks",
    "question": "Compare activation functions: sigmoid, tanh, ReLU, GELU. Why is ReLU the common default?",
    "technical": [
      "Sigmoid maps to 0–1 but saturates and can cause vanishing gradients; it remains useful for binary output probabilities.",
      "tanh is zero-centred but also saturates.",
      "ReLU is cheap and preserves positive gradients, making it a common hidden-layer default, but can create dead neurons.",
      "GELU smoothly gates values and is common in Transformers because it works well empirically."
    ],
    "layman": "Activation functions decide how strongly each neuron passes its signal onward.",
    "usecases": [
      "Sigmoid output for binary classification",
      "ReLU in CNNs",
      "GELU in Transformers"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q17\n\nExample:\nHidden layers: ReLU/GELU.\nBinary output: sigmoid.\nMulticlass output: softmax.",
    "followups": [
      "What is a dead ReLU?",
      "Why not use sigmoid in every hidden layer?"
    ],
    "redflags": [
      "Says ReLU outputs probabilities",
      "Ignores output-layer task"
    ],
    "memory": "Use activation according to gradient behaviour and output semantics."
  },
  {
    "id": "ai-kit-018",
    "title": "Batch Normalisation vs. Layer Normalisation",
    "category": "Deep Learning & Neural Networks",
    "question": "What is the difference between Batch Normalization and Layer Normalization? Why do Transformers use LayerNorm?",
    "technical": [
      "BatchNorm normalises each feature using statistics across a mini-batch and keeps running statistics for inference.",
      "LayerNorm normalises features within each individual example/token and behaves consistently across batch sizes.",
      "Transformers favour LayerNorm because sequence workloads often use variable lengths and small or changing batches, and token processing should not depend on other examples in the batch."
    ],
    "layman": "BatchNorm compares one feature across a classroom; LayerNorm balances all features within one student’s record.",
    "usecases": [
      "BatchNorm in CNNs",
      "LayerNorm in Transformer blocks"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q18\n\nExample:\nLayerNorm is applied around attention and feed-forward sublayers, often in pre-norm or post-norm layouts.",
    "followups": [
      "What changes between BatchNorm training and inference?",
      "Pre-norm versus post-norm?"
    ],
    "redflags": [
      "Says both normalise over the same dimensions",
      "Ignores running statistics"
    ],
    "memory": "BatchNorm depends on batch statistics; LayerNorm normalises each example independently."
  },
  {
    "id": "ai-kit-019",
    "title": "Dropout",
    "category": "Deep Learning & Neural Networks",
    "question": "How does dropout work? Why does it behave differently at training time vs. inference time?",
    "technical": [
      "During training, dropout randomly zeros selected activations, discouraging fragile co-adaptation and acting as regularisation.",
      "Remaining activations are scaled so their expected magnitude matches inference.",
      "During inference, dropout is disabled and the complete network is used deterministically.",
      "It is not automatically beneficial in every architecture or data regime."
    ],
    "layman": "During practice, randomly remove some team members so the team does not rely on only one person; use everyone during the real event.",
    "usecases": [
      "Regularising dense or neural network layers"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q19\n\nExample:\nDropout p=0.1 means roughly 10% of selected activations are masked during each training pass.",
    "followups": [
      "Why must train/eval mode be set correctly?",
      "How does dropout resemble ensembling?"
    ],
    "redflags": [
      "Leaves dropout enabled unintentionally in inference",
      "Calls it data augmentation"
    ],
    "memory": "Dropout randomises training paths; inference uses the full network."
  },
  {
    "id": "ai-kit-020",
    "title": "CNN vs. RNN vs. Transformer",
    "category": "Deep Learning & Neural Networks",
    "question": "When would you use a CNN vs. an RNN vs. a Transformer? What limitations of RNNs did Transformers solve?",
    "technical": [
      "CNNs exploit local spatial structure and parameter sharing, making them effective for images and local patterns.",
      "RNNs process sequences recurrently and maintain hidden state but are difficult to parallelise and struggle with long dependencies.",
      "Transformers use attention to connect distant tokens directly and train in parallel, though attention can be expensive for long sequences.",
      "Choose based on data structure, latency, scale and available training data; hybrid architectures are common."
    ],
    "layman": "CNNs scan neighbourhoods, RNNs read one step at a time with memory, and Transformers let every relevant part look at other parts directly.",
    "usecases": [
      "CNN for image classification",
      "RNN for small streaming sequence model",
      "Transformer for language or multimodal modelling"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q20\n\nExample:\nA vision Transformer may replace a CNN at scale, but a compact CNN can still be better for an edge device.",
    "followups": [
      "What did attention solve in RNNs?",
      "What is the quadratic attention cost?"
    ],
    "redflags": [
      "Says Transformers are always superior",
      "Ignores streaming and hardware constraints"
    ],
    "memory": "Architecture choice follows structure, dependency length, parallelism and deployment constraints."
  },
  {
    "id": "ai-kit-021",
    "title": "Transformer Architecture",
    "category": "Large Language Models",
    "question": "Explain the Transformer architecture at a high level. What made 'Attention Is All You Need' such a breakthrough?",
    "technical": [
      "Transformers stack attention and position-wise feed-forward layers with residual connections and normalisation.",
      "Self-attention lets each token combine information from other tokens, while masks control which positions are visible.",
      "The breakthrough was replacing recurrence with attention, enabling parallel training and stronger modelling of long-range relationships.",
      "Encoder, decoder and encoder–decoder variants adapt the block to different tasks."
    ],
    "layman": "Instead of reading a sentence strictly word by word, every word can directly examine other relevant words before producing an understanding or next word.",
    "usecases": [
      "Machine translation",
      "Text generation",
      "Multimodal models"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q21\n\nHigh-level block:\nembeddings + position → attention → residual/norm → feed-forward → residual/norm → output head.",
    "followups": [
      "What is causal masking?",
      "Why are residual connections important?"
    ],
    "redflags": [
      "Describes only attention and omits feed-forward/residual/norm",
      "Says recurrence is still required"
    ],
    "memory": "Transformer = attention + feed-forward blocks, trained in parallel with positional information."
  },
  {
    "id": "ai-kit-022",
    "title": "Self-Attention: Query, Key and Value",
    "category": "Large Language Models",
    "question": "Explain self-attention. What are Query, Key, and Value, and how is the attention score computed (scaled dot-product)?",
    "technical": [
      "Each token is projected into query, key and value vectors.",
      "Similarity between a query and all keys determines attention weights; scaled dot-product attention uses softmax(QKᵀ/√dₖ).",
      "The output is a weighted sum of values. Scaling prevents dot products from becoming too large and softmax from saturating.",
      "Masks remove invalid or future positions."
    ],
    "layman": "A query asks what information is needed, keys advertise what each token contains, and values carry the information to retrieve.",
    "usecases": [
      "Resolve pronouns or dependencies across a sentence"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q22\n\nAttention(Q,K,V) = softmax(QKᵀ / √dₖ)V",
    "followups": [
      "Why divide by √dₖ?",
      "How does causal masking work?"
    ],
    "redflags": [
      "Says Q/K/V are database tables",
      "Cannot explain weighted sum"
    ],
    "memory": "Queries match keys; the resulting weights mix values."
  },
  {
    "id": "ai-kit-023",
    "title": "Multi-Head Attention",
    "category": "Large Language Models",
    "question": "Why do Transformers use multi-head attention instead of a single attention head?",
    "technical": [
      "Multiple heads learn different projections and relationship patterns in parallel.",
      "One head may focus on local syntax while another captures long-range or semantic associations.",
      "Head outputs are concatenated and projected back to the model dimension.",
      "More heads are not automatically better; each head has reduced dimensionality and adds compute/memory."
    ],
    "layman": "Several specialists examine the same sentence from different perspectives and combine their findings.",
    "usecases": [
      "Language dependencies",
      "Multimodal alignment"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q23\n\nExample:\nHead 1 attends to nearby modifiers; Head 2 links a pronoun to its noun; Head 3 tracks document section context.",
    "followups": [
      "Can heads become redundant?",
      "How does head dimension relate to model dimension?"
    ],
    "redflags": [
      "Claims each head receives a different input sequence",
      "Assumes heads map to human-interpretable rules"
    ],
    "memory": "Multiple heads provide several learned attention subspaces."
  },
  {
    "id": "ai-kit-024",
    "title": "Positional Encoding and RoPE",
    "category": "Large Language Models",
    "question": "Why do Transformers need positional encodings? What is RoPE (rotary positional embedding)?",
    "technical": [
      "Self-attention alone is permutation-invariant, so Transformers need position information.",
      "Absolute or learned positional embeddings add position to token representations.",
      "RoPE rotates query and key dimensions according to position, encoding relative position directly in attention dot products.",
      "Long-context behaviour depends on training range and the model’s positional scheme; extrapolation is not guaranteed."
    ],
    "layman": "Attention knows which words are related but needs numbered seats to know their order.",
    "usecases": [
      "Long-context LLMs",
      "Sequence modelling"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q24\n\nExample:\n“dog bites man” and “man bites dog” contain the same words; positional information distinguishes their meaning.",
    "followups": [
      "Absolute versus relative position?",
      "Why can context extension require RoPE scaling?"
    ],
    "redflags": [
      "Says attention inherently knows order",
      "Treats context extension as free"
    ],
    "memory": "Position mechanisms tell order; RoPE encodes relative position through rotations."
  },
  {
    "id": "ai-kit-025",
    "title": "Encoder-only, Decoder-only and Encoder–Decoder Models",
    "category": "Large Language Models",
    "question": "Compare encoder-only (BERT), decoder-only (GPT), and encoder-decoder (T5) architectures. When is each used?",
    "technical": [
      "Encoder-only models use bidirectional context and are strong for classification, tagging and embedding tasks.",
      "Decoder-only models use causal attention and generate text autoregressively.",
      "Encoder–decoder models encode an input and generate a conditioned output, fitting translation and structured transformation.",
      "Task, latency, controllability and available checkpoints determine the choice."
    ],
    "layman": "An encoder is a reader, a decoder is a writer, and an encoder–decoder first reads a source then writes a transformed result.",
    "usecases": [
      "BERT for classification",
      "GPT for generation",
      "T5 for translation/summarisation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q25\n\nExample:\nSearch embedding → encoder.\nChat completion → decoder-only.\nTranslate English to French → encoder–decoder.",
    "followups": [
      "Why is BERT not naturally autoregressive?",
      "Can decoder-only models perform classification?"
    ],
    "redflags": [
      "Says one architecture cannot perform tasks outside its common use",
      "Ignores attention masks"
    ],
    "memory": "Encoder understands; decoder generates; encoder–decoder transforms one sequence into another."
  },
  {
    "id": "ai-kit-026",
    "title": "Tokenisation and BPE",
    "category": "Large Language Models",
    "question": "What is tokenization? Explain Byte-Pair Encoding (BPE) and how token count affects cost and context limits.",
    "technical": [
      "Tokenisation converts text into model vocabulary IDs; tokens may be words, subwords, bytes or characters.",
      "BPE repeatedly merges frequent adjacent symbol pairs, balancing vocabulary size and sequence length.",
      "Token count drives context consumption, inference cost and latency and varies by language and text type.",
      "Always estimate tokens with the target model’s tokenizer rather than character count."
    ],
    "layman": "The model reads pieces of words, and some languages or unusual text need more pieces than others.",
    "usecases": [
      "Prompt budgeting",
      "Cost estimation",
      "Handling code or multilingual input"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q26\n\nExample:\nA long identifier or uncommon word may split into many subword tokens, making code or some languages more expensive.",
    "followups": [
      "Why use subwords instead of full words?",
      "What happens to unknown text in byte-level tokenisers?"
    ],
    "redflags": [
      "Assumes one token equals one word",
      "Uses character count as exact token count"
    ],
    "memory": "Tokens are model-specific units; more tokens mean more context, latency and cost."
  },
  {
    "id": "ai-kit-027",
    "title": "Temperature, Top-p and Top-k Sampling",
    "category": "Large Language Models",
    "question": "Explain temperature, top-p (nucleus), and top-k sampling. When would you set temperature to 0?",
    "technical": [
      "Temperature rescales logits: lower values sharpen the distribution; higher values increase diversity.",
      "Top-k limits candidates to the k highest-probability tokens.",
      "Top-p selects the smallest token set whose cumulative probability reaches p.",
      "For extraction or deterministic structured work, use low temperature and constrained output; temperature zero may still not guarantee bit-for-bit determinism across infrastructure."
    ],
    "layman": "Temperature changes adventurousness, top-k always keeps the same fixed number of options, and top-p keeps adding the next most likely option until the shortlist covers most of the realistic answers, so its size can change from one answer to the next.",
    "usecases": [
      "Creative writing versus JSON extraction"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q27\n\nExample:\nCompliance extraction: temperature near 0.\nBrainstorming: moderate temperature with top-p control.",
    "followups": [
      "Should top-k and top-p always be combined?",
      "Why can low temperature still produce errors?"
    ],
    "redflags": [
      "Says temperature changes factual knowledge",
      "Claims zero always guarantees identical results"
    ],
    "memory": "Sampling controls diversity, not correctness."
  },
  {
    "id": "ai-kit-028",
    "title": "Context Windows and “Lost in the Middle”",
    "category": "Large Language Models",
    "question": "What is a context window? What happens when it is exceeded, and what is the 'lost in the middle' problem?",
    "technical": [
      "The context window is the maximum tokens the model can attend to for input plus generated output, depending on the API/model.",
      "When exceeded, the application must reject, truncate, summarise or retrieve selectively; silent truncation can remove critical instructions.",
      "“Lost in the middle” describes weaker use of relevant information placed deep inside very long contexts.",
      "Use retrieval, hierarchical summaries, context prioritisation and evaluation by evidence position."
    ],
    "layman": "A desk can hold only so many pages, and information buried in the centre of a huge pile may be overlooked.",
    "usecases": [
      "Long documents",
      "Long-running agent sessions"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q28\n\nExample:\nReserve output tokens, keep critical policy near the beginning/end, and retrieve only evidence needed for the question.",
    "followups": [
      "Does a larger context remove the need for RAG?",
      "How do you test position sensitivity?"
    ],
    "redflags": [
      "Counts only input tokens",
      "Assumes all context positions are equally effective"
    ],
    "memory": "Context capacity is finite, costly and not equally reliable at every position."
  },
  {
    "id": "ai-kit-029",
    "title": "Pre-training, SFT and Instruction Tuning",
    "category": "Large Language Models",
    "question": "Differentiate pre-training, supervised fine-tuning (SFT), and instruction tuning.",
    "technical": [
      "Pre-training learns broad language or multimodal patterns from large-scale self-supervised data.",
      "Supervised fine-tuning trains on labelled input–output examples for desired tasks or behaviours.",
      "Instruction tuning is an SFT form using diverse natural-language instructions so the model generalises to following requests.",
      "Alignment stages may additionally use preference optimisation and safety training."
    ],
    "layman": "Pre-training builds broad knowledge, SFT practises selected tasks, and instruction tuning teaches the model to respond to human directions.",
    "usecases": [
      "Domain model adaptation",
      "Assistant behaviour training"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q29\n\nExample:\nPre-train on text → tune on question/answer examples → preference-align helpful responses.",
    "followups": [
      "How is continued pre-training different from SFT?",
      "What causes catastrophic forgetting?"
    ],
    "redflags": [
      "Says fine-tuning simply uploads facts",
      "Treats all post-training as the same"
    ],
    "memory": "Pre-training learns general patterns; instruction/SFT shapes task behaviour."
  },
  {
    "id": "ai-kit-030",
    "title": "RLHF and DPO",
    "category": "Large Language Models",
    "question": "Explain RLHF (Reinforcement Learning from Human Feedback) end-to-end: the role of the reward model and policy optimization. How is DPO (Direct Preference Optimization) a simpler alternative?",
    "technical": [
      "RLHF commonly collects preference comparisons, trains a reward model and optimises the policy against that reward while constraining drift from a reference model.",
      "Policy optimisation introduces complexity, instability and reward-hacking risk.",
      "DPO directly optimises preferred versus rejected responses using a reference model, avoiding a separately deployed reward model and online RL loop.",
      "Both depend heavily on preference-data quality and evaluation."
    ],
    "layman": "People rank answers; RLHF builds a scoring teacher and trains with it, while DPO learns more directly from the ranked pairs.",
    "usecases": [
      "Aligning helpfulness, tone and refusal behaviour"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q30\n\nFlow:\npreferences → reward model → policy optimisation (RLHF)\nor\npreference pairs + reference model → direct preference loss (DPO).",
    "followups": [
      "What is reward hacking?",
      "Why keep a reference model?"
    ],
    "redflags": [
      "Says RLHF means human reviews every generated answer",
      "Calls DPO ordinary SFT"
    ],
    "memory": "RLHF learns through a reward model; DPO optimises preference pairs directly."
  },
  {
    "id": "ai-kit-031",
    "title": "LoRA and QLoRA",
    "category": "Large Language Models",
    "question": "What is parameter-efficient fine-tuning? Explain LoRA and QLoRA and why they are so widely used.",
    "technical": [
      "Parameter-efficient fine-tuning updates a small number of additional parameters while freezing most base weights.",
      "LoRA learns low-rank adapter matrices for selected weight updates, greatly reducing trainable parameters and storage.",
      "QLoRA keeps the frozen base model quantised—commonly 4-bit—while training LoRA adapters with higher-precision computation.",
      "Trade-offs include adapter management, target-module selection and possible quality limits versus full tuning."
    ],
    "layman": "Instead of rebuilding a large machine, attach small adjustable modules that change its behaviour.",
    "usecases": [
      "Tenant/domain adapters",
      "Task-specific open-model tuning"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q31\n\nExample:\nFreeze a 7B model, apply rank-16 LoRA adapters to attention projections, and train only those adapters.",
    "followups": [
      "What does rank control?",
      "Can multiple adapters be combined?"
    ],
    "redflags": [
      "Says base weights are fully retrained",
      "Assumes QLoRA quantises the trainable adapters only"
    ],
    "memory": "LoRA trains small low-rank updates; QLoRA does so on a quantised frozen base."
  },
  {
    "id": "ai-kit-032",
    "title": "Model Quantisation",
    "category": "Large Language Models",
    "question": "What is model quantization (8-bit, 4-bit)? What tradeoffs does it introduce?",
    "technical": [
      "Quantisation stores or computes weights/activations at lower precision, such as 8-bit or 4-bit.",
      "It reduces memory, bandwidth and often latency, enabling larger models on smaller hardware.",
      "Trade-offs include accuracy loss, calibration sensitivity, hardware/kernel compatibility and possible slower paths if optimised kernels are absent.",
      "Evaluate task quality and end-to-end serving performance, not model size alone."
    ],
    "layman": "Represent numbers with fewer digits to save space and move them faster, accepting some rounding.",
    "usecases": [
      "On-device inference",
      "Lower-cost GPU serving"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q32\n\nExample:\nAn 8-bit model may preserve quality well, while 4-bit enables much lower memory but needs stronger validation.",
    "followups": [
      "Post-training quantisation versus quantisation-aware training?",
      "Which layers are most sensitive?"
    ],
    "redflags": [
      "Says lower bits always make inference faster",
      "No quality benchmark"
    ],
    "memory": "Quantisation trades numerical precision for memory and serving efficiency."
  },
  {
    "id": "ai-kit-033",
    "title": "Why LLMs Hallucinate",
    "category": "Large Language Models",
    "question": "Why do LLMs hallucinate? List practical mitigation strategies you would use in production.",
    "technical": [
      "LLMs optimise next-token likelihood, not a built-in truth objective; they can produce plausible completions when evidence is absent or ambiguous.",
      "Causes include stale/missing knowledge, misleading prompts, retrieval failures, distribution shift and forced-answer behaviour.",
      "Mitigate with grounded retrieval/tools, authoritative data, abstention, citations, structured constraints, verification, lower-risk workflows and human review.",
      "Measure hallucination by task and risk; no single prompt eliminates it."
    ],
    "layman": "The model is an excellent sentence completer, so it may confidently fill a gap instead of saying it does not know.",
    "usecases": [
      "Enterprise Q&A",
      "Data extraction",
      "Customer support"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q33\n\nExample:\nRequire answers only from retrieved policy passages and return “insufficient evidence” when retrieval quality is below threshold.",
    "followups": [
      "Can temperature zero remove hallucinations?",
      "How do you verify citations?"
    ],
    "redflags": [
      "Claims hallucination can be fully solved by one system prompt",
      "Uses citations without validating support"
    ],
    "memory": "Ground, constrain, verify and allow abstention—fluency is not truth."
  },
  {
    "id": "ai-kit-034",
    "title": "Zero-shot, Few-shot and Chain-of-Thought Prompting",
    "category": "Large Language Models",
    "question": "Compare zero-shot, few-shot, and chain-of-thought prompting. When does CoT actually help?",
    "technical": [
      "Zero-shot gives instructions without examples; few-shot includes representative demonstrations.",
      "Few-shot prompts improve format and task interpretation but consume context and can transfer example bias.",
      "Chain-of-thought-style decomposition can help multi-step reasoning, but production systems should request concise rationales or hidden/internal reasoning rather than depend on verbose free-form traces.",
      "Use deterministic tools for arithmetic and high-stakes logic when possible."
    ],
    "layman": "Zero-shot gives directions, few-shot shows examples, and stepwise prompting encourages the model to break a problem into parts.",
    "usecases": [
      "Structured classification",
      "Complex planning",
      "Data transformation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q34\n\nExample:\nProvide three labelled support-ticket examples to enforce category and JSON format.",
    "followups": [
      "When can examples hurt?",
      "How do you evaluate prompt variants?"
    ],
    "redflags": [
      "Assumes chain-of-thought guarantees correctness",
      "Includes sensitive hidden reasoning in logs"
    ],
    "memory": "Examples teach format; decomposition can help reasoning, but verify the result."
  },
  {
    "id": "ai-kit-035",
    "title": "KV Cache",
    "category": "Large Language Models",
    "question": "What is the KV cache and why is it critical for fast autoregressive inference?",
    "technical": [
      "Autoregressive generation repeatedly attends to previous tokens.",
      "The KV cache stores prior layers’ key and value tensors so they do not need to be recomputed for every new token.",
      "It greatly improves decoding speed but consumes memory proportional to sequence length, layers, heads and batch size.",
      "Paged attention, grouped-query attention and cache quantisation help serving efficiency."
    ],
    "layman": "Keep the notes from earlier reading instead of rereading the entire book before writing each next word.",
    "usecases": [
      "High-throughput LLM serving",
      "Long chat generation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q35\n\nWithout cache: recompute old K/V every token.\nWith cache: compute only the new token’s K/V and reuse history.",
    "followups": [
      "Why does long context reduce serving capacity?",
      "What is cache eviction?"
    ],
    "redflags": [
      "Says it caches final text responses",
      "Ignores memory cost"
    ],
    "memory": "KV cache trades memory for much faster autoregressive decoding."
  },
  {
    "id": "ai-kit-036",
    "title": "Inference Parameters",
    "category": "Large Language Models",
    "question": "Explain common inference parameters: max tokens, stop sequences, frequency penalty, and presence penalty.",
    "technical": [
      "max tokens limits generated output length and must fit with input inside the context limit.",
      "Stop sequences terminate generation when matched, but the application must still validate completeness.",
      "Frequency penalty discourages repeated tokens based on count; presence penalty discourages reuse after a token has appeared.",
      "Parameter semantics vary by provider, so validate with the actual API and task."
    ],
    "layman": "These controls set answer length, stopping conditions and how strongly the model avoids repeating itself.",
    "usecases": [
      "Prevent runaway output",
      "Control repetitive creative generation",
      "Terminate at a structured delimiter"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q36\n\nExample:\nSet a bounded output length and schema validation for extraction rather than relying only on a stop sequence.",
    "followups": [
      "What happens when max tokens is reached mid-JSON?",
      "Do penalties improve factuality?"
    ],
    "redflags": [
      "Uses large max tokens without cost control",
      "Assumes stop sequences guarantee valid output"
    ],
    "memory": "Inference controls shape generation; application validation still owns correctness."
  },
  {
    "id": "ai-kit-037",
    "title": "Prompt Engineering vs. RAG vs. Fine-tuning",
    "category": "Large Language Models",
    "question": "Prompt engineering vs. RAG vs. fine-tuning: how do you decide which approach a use case needs, for example when a client asks to fine-tune because RAG answers are weak?",
    "technical": [
      "Use prompt engineering for instructions, format and lightweight behaviour changes.",
      "Use RAG for dynamic, private or frequently changing knowledge with traceable evidence.",
      "Use fine-tuning for repeatable behaviour, style, specialised patterns or efficiency when enough governed training data exists.",
      "Combine them only after defining a baseline and evaluating cost, latency, governance and maintenance.",
      "Diagnose source, retrieval, chunking and prompting before concluding that fine-tuning is needed.",
      "Before tuning, assess training-data quality, privacy and consent, then test generalisation, regressions and rollback."
    ],
    "layman": "Change the instructions for behaviour, look up the latest handbook for knowledge, and retrain only when the worker needs a durable specialised skill.",
    "usecases": [
      "Policy assistant uses prompt + RAG; classifier may use tuning"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q37\n\nDecision:\nMissing current facts → RAG.\nWrong output format → prompt/structured output.\nPersistent domain behaviour with quality data → consider tuning.",
    "followups": [
      "Can RAG and tuning be combined?",
      "Why not fine-tune for changing policies?",
      "What data governance applies to fine-tuning?",
      "How is regression tested after tuning?"
    ],
    "redflags": [
      "Fine-tunes before diagnosing retrieval",
      "Uses RAG for simple formatting",
      "Uses fine-tuning for changing facts",
      "No data-governance discussion"
    ],
    "memory": "Prompt changes instructions; RAG supplies knowledge; tuning changes learned behaviour."
  },
  {
    "id": "ai-kit-038",
    "title": "Mixture of Experts",
    "category": "Large Language Models",
    "question": "What is Mixture of Experts (MoE)? How does it let models scale parameters without scaling inference cost proportionally?",
    "technical": [
      "MoE models contain many expert feed-forward sub-networks but route each token to only a small subset.",
      "This increases total parameter capacity without activating every parameter for each token.",
      "Benefits include capacity and specialisation; challenges include routing balance, communication overhead, memory footprint and deployment complexity.",
      "Active compute does not scale linearly with total parameters, but inference is not free."
    ],
    "layman": "A large company has many specialists, but each request is sent only to the few specialists most relevant to it.",
    "usecases": [
      "Large-scale language models with sparse expert routing"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q38\n\nExample:\nA router selects top-2 experts per token from a larger expert pool, then combines their outputs.",
    "followups": [
      "What is expert collapse or load imbalance?",
      "Why can MoE be harder to serve?"
    ],
    "redflags": [
      "Says only selected model layers are loaded into memory",
      "Claims cost is independent of expert count"
    ],
    "memory": "MoE increases total capacity by activating only selected experts per token."
  },
  {
    "id": "ai-kit-039",
    "title": "Prompt Injection and Jailbreaking",
    "category": "Large Language Models",
    "question": "What are prompt injection and jailbreaking? How would you defend an LLM application against them?",
    "technical": [
      "Prompt injection tries to override application instructions or misuse tools; indirect injection arrives through retrieved documents, websites or tool results.",
      "Jailbreaking seeks to bypass model safety behaviour through crafted user input.",
      "Use instruction/data separation, least-privilege tools, server-side authorisation, schema validation, destination/egress controls, sandboxing, DLP and human approval.",
      "Treat model output and retrieved content as untrusted; detection alone is insufficient.",
      "Audit injection attempts without revealing unauthorised data to the requester."
    ],
    "layman": "A malicious note inside a file cannot grant itself new keys or authority.",
    "usecases": [
      "Tool-using support agent",
      "RAG over external documents"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q39\n\nExample:\nThe model may propose send_email, but the application validates user permission, recipient domain, content policy and approval before execution.",
    "followups": [
      "How does indirect injection differ?",
      "Why is a system prompt insufficient?",
      "What if the user asks the model to obey instructions found in a document?"
    ],
    "redflags": [
      "Only says “tell the model to ignore it”",
      "Gives model unrestricted network/file access",
      "No tool-level authorisation"
    ],
    "memory": "Security lives outside the prompt: least privilege, validation and controlled execution."
  },
  {
    "id": "ai-kit-040",
    "title": "System Prompts, User Prompts and Structured Output",
    "category": "Large Language Models",
    "question": "What is the difference between a system prompt and a user prompt? How do structured outputs / JSON mode work?",
    "technical": [
      "A system prompt defines application-level behaviour and policy; a user prompt supplies the user’s request and data.",
      "Instruction priority helps, but it is not a security boundary.",
      "Structured-output or JSON modes constrain generation toward a schema; the application must still parse, validate and handle refusals/truncation.",
      "Never embed untrusted content as if it were a system instruction."
    ],
    "layman": "The system prompt is the employee handbook, the user prompt is today’s request, and a schema is the required form the answer must fill.",
    "usecases": [
      "Reliable API extraction",
      "Tool-call argument generation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q40\n\nExample:\nRequire {\"category\": enum, \"confidence\": number}; reject values that fail schema or business validation.",
    "followups": [
      "Can user text override security controls?",
      "What happens if generation stops mid-object?"
    ],
    "redflags": [
      "Treats JSON mode as factual validation",
      "Places customer documents in system instructions"
    ],
    "memory": "Prompt hierarchy guides behaviour; schemas constrain shape; application code validates meaning."
  },
  {
    "id": "ai-kit-041",
    "title": "What RAG Solves",
    "category": "Retrieval-Augmented Generation",
    "question": "What is Retrieval-Augmented Generation? What problems does it solve compared to fine-tuning or relying on model memory?",
    "technical": [
      "RAG retrieves external evidence at request time and conditions generation on it.",
      "It supports current, private and auditable knowledge without modifying base-model weights.",
      "It can reduce unsupported answers and provide citations, but retrieval and document quality become new failure modes.",
      "Fine-tuning is better suited to behaviour than frequently changing facts."
    ],
    "layman": "Instead of expecting the employee to memorise every handbook, let them search the authorised handbook before answering.",
    "usecases": [
      "Enterprise knowledge assistant",
      "Support Q&A",
      "Regulatory policy search"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q41\n\nRAG flow:\nquestion → retrieve relevant evidence → construct grounded prompt → answer with citations.",
    "followups": [
      "When is RAG unnecessary?",
      "Can RAG completely prevent hallucination?"
    ],
    "redflags": [
      "Calls vector search alone RAG",
      "Assumes retrieval guarantees correctness"
    ],
    "memory": "RAG supplies evidence at query time; the model still needs evaluation and controls."
  },
  {
    "id": "ai-kit-042",
    "title": "End-to-End RAG Pipeline",
    "category": "Retrieval-Augmented Generation",
    "question": "Walk through a complete RAG pipeline end-to-end: ingestion, chunking, embedding, indexing, retrieval, and generation.",
    "technical": [
      "Ingest source documents with identity, version, tenant and permission metadata.",
      "Parse/OCR, clean and chunk according to structure; generate embeddings and index searchable representations while retaining originals.",
      "At query time authenticate, transform the query if needed, apply ACL filters, retrieve dense/sparse candidates and rerank.",
      "Build a bounded prompt with evidence, require citations/abstention, generate and validate the result.",
      "Monitor freshness, retrieval quality, groundedness, latency, cost and feedback."
    ],
    "layman": "A secure librarian catalogues documents, finds the best passages for a question and gives them to the writer with source labels.",
    "usecases": [
      "Private document assistant",
      "Product-support knowledge base"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q42\n\nIngestion → parse/OCR → structure-aware chunks → embeddings/index\nQuery → auth/ACL → retrieve → rerank → context → LLM → validate/cite",
    "followups": [
      "Where is ACL enforcement applied?",
      "How are deleted documents removed from every index?"
    ],
    "redflags": [
      "No source versioning",
      "Fixed chunks without structure",
      "No evaluation"
    ],
    "memory": "RAG is two pipelines: governed indexing and authorised retrieval/generation."
  },
  {
    "id": "ai-kit-043",
    "title": "Embeddings and Similarity",
    "category": "Retrieval-Augmented Generation",
    "question": "What are embeddings? How is similarity between two embeddings measured, and why is cosine similarity common?",
    "technical": [
      "Embeddings map text, images or other objects into vectors where semantic relationships are represented geometrically.",
      "Cosine similarity compares vector direction and is common because it reduces sensitivity to magnitude; dot product or Euclidean distance may be correct depending on model/index training.",
      "Use the same compatible embedding model and preprocessing for indexed content and queries.",
      "Similarity is not relevance or authorisation; reranking and metadata filters remain necessary."
    ],
    "layman": "Embeddings turn meaning into coordinates so similar ideas are placed near one another.",
    "usecases": [
      "Semantic search",
      "Clustering",
      "Deduplication"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q43\n\ncosine(a,b) = (a·b) / (||a|| ||b||)",
    "followups": [
      "When is dot product equivalent to cosine?",
      "Why should embeddings not be mixed across models?"
    ],
    "redflags": [
      "Treats similarity score as probability",
      "Ignores model/version compatibility"
    ],
    "memory": "Embeddings provide candidate semantic proximity, not final relevance or access control."
  },
  {
    "id": "ai-kit-044",
    "title": "Chunking Strategies",
    "category": "Retrieval-Augmented Generation",
    "question": "Explain chunking strategies (fixed-size, recursive, semantic). How do chunk size and overlap affect retrieval quality?",
    "technical": [
      "Fixed-size chunking is simple but can split sentences, tables and concepts.",
      "Recursive or structure-aware chunking respects headings, paragraphs and document elements; semantic chunking groups conceptually coherent spans.",
      "Small chunks improve precision but lose context; large chunks preserve context but dilute retrieval and consume tokens. Overlap protects boundaries but increases duplication and cost.",
      "Choose through evaluation by document type and query pattern, not one universal token size."
    ],
    "layman": "Cut a book into pieces at chapter and paragraph boundaries, not every fixed number of characters.",
    "usecases": [
      "Policies, source code, tables and manuals need different chunk strategies"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q44\n\nExample:\nKeep a table with its caption and introductory sentence; store section hierarchy in metadata.",
    "followups": [
      "How would you chunk code?",
      "How do parent/child chunks help?"
    ],
    "redflags": [
      "Uses 512 tokens for every source",
      "Adds large overlap without measuring duplication"
    ],
    "memory": "Chunk for coherent retrieval; size and overlap are evaluation parameters, not constants."
  },
  {
    "id": "ai-kit-045",
    "title": "Vector Databases and HNSW",
    "category": "Retrieval-Augmented Generation",
    "question": "What is a vector database? Name a few (FAISS, Pinecone, Chroma, pgvector) and explain how ANN indexes like HNSW enable fast search.",
    "technical": [
      "A vector database stores embeddings plus metadata and supports nearest-neighbour search, filtering, updates and operational controls.",
      "Examples include FAISS libraries, managed vector services, Chroma and pgvector; selection depends on scale, filtering, consistency, operations and cost.",
      "HNSW builds a multi-layer proximity graph and searches through likely neighbours instead of comparing every vector.",
      "Approximate search trades a small amount of recall for much lower latency; tune efSearch, graph parameters and candidate count."
    ],
    "layman": "Instead of checking every house in a city, HNSW follows a network of nearby landmarks to reach the relevant neighbourhood quickly.",
    "usecases": [
      "Large document semantic search",
      "Recommendation candidate retrieval"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q45\n\nIndex flow:\nembedding + document_id + tenant_id + metadata → ANN index → top-k candidates → reranker.",
    "followups": [
      "What is recall–latency trade-off?",
      "When is pgvector sufficient?"
    ],
    "redflags": [
      "Chooses database only by benchmark",
      "No metadata-filter or deletion strategy"
    ],
    "memory": "ANN indexes accelerate candidate search by accepting a controlled recall trade-off."
  },
  {
    "id": "ai-kit-046",
    "title": "Dense, Sparse and Hybrid Retrieval",
    "category": "Retrieval-Augmented Generation",
    "question": "Compare dense retrieval and sparse/keyword retrieval (BM25). What is hybrid search and when is it worth it?",
    "technical": [
      "Dense retrieval uses embeddings and captures semantic similarity, paraphrases and concepts.",
      "Sparse retrieval such as BM25 matches weighted terms and excels at exact identifiers, names, rare words and lexical evidence.",
      "Hybrid search combines both candidate sets, often using score normalisation or reciprocal-rank fusion, then reranks.",
      "It is valuable when queries mix concepts with exact product codes, legal terms or names."
    ],
    "layman": "Dense search understands meaning; sparse search finds exact wording; hybrid uses both detectives.",
    "usecases": [
      "Support search with product IDs and natural-language descriptions"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q46\n\nExample:\nQuery “error E104 payment timeout” benefits from exact E104 matching and semantic timeout context.",
    "followups": [
      "How do you combine incomparable scores?",
      "When can hybrid add unnecessary cost?"
    ],
    "redflags": [
      "Says embeddings always replace keyword search",
      "No fusion or evaluation method"
    ],
    "memory": "Dense finds meaning, sparse finds exact terms, hybrid improves mixed-query recall."
  },
  {
    "id": "ai-kit-047",
    "title": "Reranking: Bi-encoder vs. Cross-encoder",
    "category": "Retrieval-Augmented Generation",
    "question": "What is reranking and why add it after retrieval? Explain bi-encoder vs. cross-encoder.",
    "technical": [
      "A bi-encoder independently embeds query and document, enabling fast large-scale retrieval.",
      "A cross-encoder jointly reads the query and each candidate and usually scores relevance more accurately but at higher cost.",
      "Use a fast retriever for broad top-k candidates, then a reranker for a smaller set.",
      "Evaluate the recall of the first stage because reranking cannot recover documents that were never retrieved."
    ],
    "layman": "First use a quick librarian to shortlist books, then let a specialist read the question beside each shortlisted passage.",
    "usecases": [
      "Rerank top 50 retrieval results down to the best 5"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q47\n\nquery → bi-encoder/ANN top 50 → cross-encoder scores → top 5 context chunks",
    "followups": [
      "What candidate count is appropriate?",
      "Can an LLM be used as a reranker?"
    ],
    "redflags": [
      "Runs expensive cross-encoder over the full corpus",
      "Assumes reranker fixes poor first-stage recall"
    ],
    "memory": "Retrieve broadly and cheaply; rerank narrowly and accurately."
  },
  {
    "id": "ai-kit-048",
    "title": "RAG Abstention When Retrieval Fails",
    "category": "Retrieval-Augmented Generation",
    "question": "How should a RAG system behave when retrieval returns nothing relevant? How do you prevent it from answering anyway?",
    "technical": [
      "Detect insufficient evidence using retrieval thresholds, reranker scores, coverage rules and answerability evaluation.",
      "Prompt the model to answer only from supplied evidence and return a defined abstention outcome when support is missing.",
      "Validate that citations actually entail key claims and avoid presenting model memory as source-backed fact.",
      "Offer clarification, search expansion or human escalation."
    ],
    "layman": "A responsible librarian says “I cannot find that in the authorised collection” rather than inventing a page.",
    "usecases": [
      "Policy question with no relevant internal document"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q48\n\nResponse example:\n“I do not have sufficient authorised evidence to answer. Please clarify the policy or contact the policy owner.”",
    "followups": [
      "How is an answerability threshold calibrated?",
      "What if retrieval finds related but contradictory sources?"
    ],
    "redflags": [
      "Forces an answer every time",
      "Uses a fixed similarity threshold without validation"
    ],
    "memory": "No evidence should produce abstention, not confident invention."
  },
  {
    "id": "ai-kit-049",
    "title": "Query Rewriting, Multi-query and HyDE",
    "category": "Retrieval-Augmented Generation",
    "question": "Explain query transformation techniques: query rewriting, multi-query, and HyDE.",
    "technical": [
      "Query rewriting corrects ambiguity, spelling or conversational references while preserving user intent.",
      "Multi-query generates several search formulations to improve recall and merges/deduplicates results.",
      "HyDE generates a hypothetical answer/document, embeds it and retrieves real documents near that representation.",
      "All transformations must preserve tenant/security context and be evaluated for drift or query expansion noise."
    ],
    "layman": "Ask several well-phrased versions of the same library question, or imagine the shape of the ideal answer to find similar material.",
    "usecases": [
      "Short ambiguous user queries",
      "Domain terminology mismatch"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q49\n\nExample:\n“refund issue” → “subscription refund eligibility”, “refund approval policy”, “payment reversal rules”.",
    "followups": [
      "When can rewriting change intent?",
      "How do you deduplicate multi-query results?"
    ],
    "redflags": [
      "Sends transformed query without auditing original",
      "Assumes more queries always improve relevance"
    ],
    "memory": "Query transformation improves recall only when intent remains controlled."
  },
  {
    "id": "ai-kit-050",
    "title": "Advanced RAG Patterns",
    "category": "Retrieval-Augmented Generation",
    "question": "Describe advanced RAG patterns you know: parent-document retrieval, sentence-window retrieval, and GraphRAG.",
    "technical": [
      "Parent-document retrieval embeds small child chunks for precise search but returns a larger parent section for context.",
      "Sentence-window retrieval indexes sentences and expands around a matched sentence at generation time.",
      "GraphRAG extracts entities/relationships and retrieves graph neighbourhoods or community summaries for relationship-heavy questions.",
      "These patterns add ingestion, consistency and evaluation complexity and should solve measured failure modes."
    ],
    "layman": "Use a small index card to locate the right chapter, then bring the complete relevant page; use a relationship map when the question is about connections.",
    "usecases": [
      "Legal sections",
      "Research synthesis",
      "Organisation/entity relationship questions"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q50\n\nPattern choice:\nPrecise passage + context → parent/child.\nLocal surrounding text → sentence window.\nMulti-hop relationships → GraphRAG.",
    "followups": [
      "When is GraphRAG overkill?",
      "How is parent versioning maintained?"
    ],
    "redflags": [
      "Uses advanced architecture without baseline",
      "Calls any knowledge graph GraphRAG"
    ],
    "memory": "Select advanced RAG patterns to correct a specific measured retrieval limitation."
  },
  {
    "id": "ai-kit-051",
    "title": "Keeping the Vector Index in Sync",
    "category": "Retrieval-Augmented Generation",
    "question": "How do you keep the vector index in sync when source documents are added, updated, or deleted?",
    "technical": [
      "Assign stable source IDs, version IDs and chunk IDs and make ingestion idempotent.",
      "Use change events or scheduled reconciliation for create/update/delete; update the source-of-truth record and index through tracked workflow states.",
      "For updates, create the new version, validate it, switch visibility atomically where possible and remove stale vectors.",
      "Support tombstones, retries, DLQ, reconciliation and deletion across vectors, raw store, caches and derived summaries."
    ],
    "layman": "The catalogue must reflect books added, revised or removed, and a regular inventory catches missed updates.",
    "usecases": [
      "Enterprise policy index",
      "Frequently updated support documentation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q51\n\nStates:\nDISCOVERED → PARSED → EMBEDDED → INDEXED → ACTIVE\nDeletion: TOMBSTONED → removed from all stores → audited.",
    "followups": [
      "What if embedding succeeds but indexing fails?",
      "How do you re-embed after a model upgrade?"
    ],
    "redflags": [
      "Uses file name as the only ID",
      "No deletion/reconciliation path"
    ],
    "memory": "Version, idempotency and reconciliation keep source and index consistent."
  },
  {
    "id": "ai-kit-053",
    "title": "Common RAG Failure Modes",
    "category": "Retrieval-Augmented Generation",
    "question": "What are the most common RAG failure modes, and how do you debug whether the problem is retrieval or generation?",
    "technical": [
      "Source failures: missing, stale, duplicated or poorly parsed documents.",
      "Retrieval failures: bad chunks, weak embeddings, wrong filters, lexical mismatch, low recall or poor reranking.",
      "Generation failures: correct evidence ignored, contradictory context, unsupported synthesis or citation mismatch.",
      "Debug each failed query by tracing authoritative evidence through ingestion, top-k retrieval, context construction and final claims.",
      "Build a ground-truth set with expected answers, authoritative passages, access context and abstention cases so each stage can be measured separately."
    ],
    "layman": "Follow the evidence from the shelf to the final answer and find the exact stage where it was lost or misused.",
    "usecases": [
      "Fluent but wrong enterprise Q&A"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q53\n\nDebug checklist:\nIs source indexed? → correct chunk in top-k? → passed ACL? → included in prompt? → answer supported?",
    "followups": [
      "What if correct evidence is ranked 18th?",
      "How do stale versions affect answers?",
      "How are citations verified?"
    ],
    "redflags": [
      "Immediately changes model or prompt",
      "No end-to-end trace",
      "No ground-truth set"
    ],
    "memory": "Diagnose source, retrieval and generation separately."
  },
  {
    "id": "ai-kit-054",
    "title": "Metadata Filtering and User-level ACLs in RAG",
    "category": "Retrieval-Augmented Generation",
    "question": "How do you implement metadata filtering and user-level access control in a RAG system?",
    "technical": [
      "Derive user and tenant permissions from trusted identity and policy services.",
      "Store tenant, document, version, classification and ACL metadata with indexed items.",
      "Apply authorised filters during candidate retrieval or use physically separated indexes where required.",
      "Recheck permissions when fetching raw content and audit access; never retrieve globally then ask the model to hide unauthorised results."
    ],
    "layman": "The library system filters the catalogue before showing books; the writer never sees unauthorised pages.",
    "usecases": [
      "Department-level or user-level enterprise document search"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q54\n\nQuery filter example:\ntenant_id = authenticated_tenant AND document_id IN authorised_documents AND status = ACTIVE",
    "followups": [
      "How are ACL changes propagated?",
      "What if the vector store has limited filtering?"
    ],
    "redflags": [
      "Relies on prompt to enforce access",
      "Trusts a client-provided tenant ID"
    ],
    "memory": "Authorisation must constrain retrieval before content reaches the model."
  },
  {
    "id": "ai-kit-055",
    "title": "Do Million-token Context Windows Replace RAG?",
    "category": "Retrieval-Augmented Generation",
    "question": "With million-token context windows, do we still need RAG? Argue both sides.",
    "technical": [
      "Long context can simplify small, bounded corpora, preserve broad document context and support one-off analysis.",
      "RAG remains valuable for large or changing corpora, permissions, citations, lower token cost, freshness and targeted evidence.",
      "Long contexts still face latency, cost, position sensitivity and irrelevant-information dilution.",
      "A hybrid may retrieve relevant documents/sections and use a long context for deeper synthesis."
    ],
    "layman": "A larger desk helps, but it does not replace a catalogue, access-control system or the need to select the right books.",
    "usecases": [
      "Deep analysis of a few documents versus enterprise search across millions"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q55\n\nDecision:\nSmall fixed packet + broad synthesis → long context may suffice.\nLarge/private/dynamic corpus → retrieval remains essential.",
    "followups": [
      "How would you benchmark both approaches?",
      "What is the security implication of loading everything?"
    ],
    "redflags": [
      "Declares RAG obsolete",
      "Ignores context cost and permissions"
    ],
    "memory": "Long context expands working memory; RAG still supplies selection, freshness, security and traceability."
  },
  {
    "id": "ai-kit-056",
    "title": "Precision, Recall and F1",
    "category": "Evaluation & Metrics",
    "question": "Define precision, recall, and F1 score. Give a scenario where you'd optimize for precision and one for recall.",
    "technical": [
      "Precision = TP/(TP+FP): among predicted positives, how many are correct.",
      "Recall = TP/(TP+FN): among real positives, how many were found.",
      "F1 is the harmonic mean of precision and recall and is useful when both matter, but it ignores true negatives and business-specific costs.",
      "Select thresholds using operational costs and capacity."
    ],
    "layman": "Precision asks whether alarms are trustworthy; recall asks whether real problems were found.",
    "usecases": [
      "High precision for auto-blocking payments",
      "High recall for first-stage medical screening"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q56\n\nExample:\n100 alerts, 80 true → precision 0.80.\n100 real fraud cases, 80 found → recall 0.80.",
    "followups": [
      "Why harmonic rather than arithmetic mean?",
      "When is Fβ useful?"
    ],
    "redflags": [
      "Reports F1 without confusion matrix or threshold",
      "Confuses precision and recall"
    ],
    "memory": "Precision controls false alarms; recall controls misses."
  },
  {
    "id": "ai-kit-057",
    "title": "Accuracy, ROC-AUC and PR-AUC",
    "category": "Evaluation & Metrics",
    "question": "When is accuracy a misleading metric? Explain ROC-AUC vs. PR-AUC and when to prefer each.",
    "technical": [
      "Accuracy is misleading with class imbalance or unequal error cost.",
      "ROC-AUC measures ranking across true-positive versus false-positive rates and can look optimistic when negatives dominate.",
      "PR-AUC focuses on precision and recall for the positive class and is often more informative for rare positives.",
      "Neither metric chooses the production threshold; inspect calibration and operating points."
    ],
    "layman": "A model can be “99% accurate” by ignoring the 1% of cases you actually care about.",
    "usecases": [
      "Fraud or defect detection"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q57\n\nExample:\nFor 1% fraud, compare PR-AUC and precision at the review team’s maximum daily alert volume.",
    "followups": [
      "What is the baseline PR-AUC?",
      "How does prevalence affect precision?"
    ],
    "redflags": [
      "Uses ROC-AUC only for extreme imbalance",
      "Treats AUC as deployed accuracy"
    ],
    "memory": "For rare positives, PR curves expose useful performance better than accuracy."
  },
  {
    "id": "ai-kit-058",
    "title": "MSE, RMSE, MAE and R²",
    "category": "Evaluation & Metrics",
    "question": "Compare regression metrics: MSE, RMSE, MAE, and R². When would you prefer MAE over RMSE?",
    "technical": [
      "MSE averages squared errors and strongly penalises large mistakes.",
      "RMSE is the square root of MSE and returns to the target’s units while retaining outlier sensitivity.",
      "MAE averages absolute errors and is more robust to outliers.",
      "R² measures variance explained relative to predicting the mean and can be negative out of sample.",
      "Choose the metric that reflects business loss."
    ],
    "layman": "MSE/RMSE punish very large misses heavily; MAE treats each extra unit of error more evenly.",
    "usecases": [
      "Demand forecasting",
      "Delivery-time prediction"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q58\n\nExample:\nPrefer MAE when occasional extreme measurement errors should not dominate; prefer RMSE when large misses are especially costly.",
    "followups": [
      "Why can R² be negative?",
      "Which metric is differentiable at zero?"
    ],
    "redflags": [
      "Calls RMSE scale-free",
      "Chooses metric without business loss"
    ],
    "memory": "MAE is robust; RMSE emphasises large errors; R² compares against a mean baseline."
  },
  {
    "id": "ai-kit-059",
    "title": "Perplexity",
    "category": "Evaluation & Metrics",
    "question": "What is perplexity and what does it measure for a language model? What are its limitations?",
    "technical": [
      "Perplexity is the exponentiated average negative log-likelihood of the next token; lower means the model assigns higher probability to the observed sequence.",
      "It is useful for comparing language models on the same tokenisation and dataset.",
      "It does not directly measure factuality, helpfulness, safety or task success.",
      "Comparisons across different tokenisers or domains can be misleading."
    ],
    "layman": "It reflects how surprised the model is by the next tokens; less surprise means lower perplexity.",
    "usecases": [
      "Pre-training validation",
      "Detecting language-model distribution shift"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q59\n\nPerplexity = exp(average token cross-entropy).",
    "followups": [
      "Why can tokenisation change perplexity?",
      "Can a low-perplexity model hallucinate?"
    ],
    "redflags": [
      "Equates perplexity with accuracy",
      "Compares different tokenisers directly"
    ],
    "memory": "Perplexity measures predictive surprise, not overall assistant quality."
  },
  {
    "id": "ai-kit-060",
    "title": "BLEU and ROUGE",
    "category": "Evaluation & Metrics",
    "question": "Explain BLEU and ROUGE. What do they measure and why are they poor fits for open-ended LLM outputs?",
    "technical": [
      "BLEU measures n-gram precision with a brevity penalty and was designed mainly for machine translation.",
      "ROUGE measures n-gram or sequence overlap, often recall-oriented, and is common in summarisation.",
      "Open-ended answers can be semantically correct with different wording, so lexical overlap can undervalue them or reward copied text.",
      "Use task-specific factual, semantic, human and groundedness evaluation for LLM systems."
    ],
    "layman": "They compare matching word sequences, so they may mark a good paraphrase as wrong and a copied but incorrect sentence as good.",
    "usecases": [
      "Translation regression",
      "Extractive summarisation baseline"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q60\n\nExample:\n“Revenue increased” and “Sales grew” can mean the same thing but have low n-gram overlap.",
    "followups": [
      "What does BLEU brevity penalty do?",
      "When is ROUGE still useful?"
    ],
    "redflags": [
      "Uses BLEU as sole chatbot metric",
      "Assumes higher overlap means factuality"
    ],
    "memory": "BLEU/ROUGE measure lexical overlap, not full semantic or factual quality."
  },
  {
    "id": "ai-kit-061",
    "title": "BERTScore and Semantic Similarity",
    "category": "Evaluation & Metrics",
    "question": "What is BERTScore / semantic-similarity-based evaluation, and how does it improve on n-gram metrics?",
    "technical": [
      "BERTScore aligns contextual token embeddings between candidate and reference and computes precision/recall/F1-like similarity.",
      "It recognises paraphrases better than exact n-gram metrics.",
      "It still depends on the encoder and reference, and high semantic similarity does not guarantee factual correctness or instruction compliance.",
      "Use it as one signal alongside task-specific checks and human evaluation."
    ],
    "layman": "Instead of matching exact words, compare the meaning represented by each phrase.",
    "usecases": [
      "Paraphrastic summarisation evaluation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q61\n\nExample:\n“Customer cancelled the plan” and “The subscription was terminated by the user” receive stronger semantic similarity than lexical overlap.",
    "followups": [
      "Can semantic similarity detect hallucinated numbers?",
      "How do references affect score?"
    ],
    "redflags": [
      "Treats BERTScore as factuality metric",
      "Ignores domain/language encoder fit"
    ],
    "memory": "Semantic similarity handles paraphrase, but it does not prove truth."
  },
  {
    "id": "ai-kit-062",
    "title": "LLM-as-a-Judge",
    "category": "Evaluation & Metrics",
    "question": "Explain LLM-as-a-judge. What biases (position bias, verbosity bias, self-preference) must you control for?",
    "technical": [
      "An LLM judge scores or compares outputs using an explicit rubric and context.",
      "Control position bias by swapping answer order, verbosity bias with concise rubrics, and self-preference by using diverse judges and human calibration.",
      "Blind model identity, randomise ordering, check inter-rater agreement and maintain labelled anchor examples.",
      "Use deterministic validators for facts, schemas and security where possible."
    ],
    "layman": "A scalable reviewer can help grade answers, but the reviewer also has preferences and mistakes that must be measured.",
    "usecases": [
      "Pairwise prompt/model evaluation",
      "RAG groundedness screening"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q62\n\nExample:\nJudge A vs B twice with reversed order; flag disagreements for human review.",
    "followups": [
      "How do you calibrate against humans?",
      "What is judge leakage?"
    ],
    "redflags": [
      "Uses one judge as ground truth",
      "Does not randomise answer order"
    ],
    "memory": "LLM judges scale evaluation, but require rubrics, bias controls and human calibration."
  },
  {
    "id": "ai-kit-063",
    "title": "Popular AI Benchmarks",
    "category": "Evaluation & Metrics",
    "question": "What do popular benchmarks measure - MMLU, HumanEval, GSM8K, MT-Bench? Why can benchmark scores be misleading?",
    "technical": [
      "MMLU tests broad multiple-choice knowledge/reasoning, HumanEval code-generation unit tests, GSM8K grade-school maths reasoning and MT-Bench multi-turn conversational quality.",
      "Scores may be distorted by training-data contamination, prompt format, sampling, evaluator bias, cherry-picking and weak relevance to the product domain.",
      "Use benchmarks for orientation, then test representative private tasks, latency, cost and safety."
    ],
    "layman": "A standard exam compares candidates, but a high exam score does not prove they can perform your specific job.",
    "usecases": [
      "Initial model shortlisting"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q63\n\nExample:\nShortlist on public benchmarks, then run a governed domain golden set and production-like load test.",
    "followups": [
      "How do you detect contamination?",
      "What product capability is absent from the benchmark?"
    ],
    "redflags": [
      "Chooses a model solely from leaderboard rank",
      "Compares scores from different evaluation settings"
    ],
    "memory": "Benchmarks are filters, not substitutes for product-specific evaluation."
  },
  {
    "id": "ai-kit-064",
    "title": "Human Evaluation at Scale",
    "category": "Evaluation & Metrics",
    "question": "How is human evaluation done at scale? Explain pairwise comparisons and Elo-style leaderboards like Chatbot Arena.",
    "technical": [
      "Define a clear rubric, train annotators and include quality-control/overlap examples.",
      "Pairwise comparison is often easier and more reliable than absolute scoring.",
      "Elo-style systems update relative ratings from pairwise wins, but results depend on prompt distribution, rater population and statistical uncertainty.",
      "Measure inter-rater agreement and review high-risk disagreements."
    ],
    "layman": "People are usually better at choosing the stronger of two answers than assigning an exact score from one to ten.",
    "usecases": [
      "Chatbot preference testing",
      "Model release comparison"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q64\n\nExample:\nRandomly show A/B answers without model names; balance order; calculate win rate and confidence intervals.",
    "followups": [
      "How are annotators calibrated?",
      "How do you handle ties and unsafe answers?"
    ],
    "redflags": [
      "No rubric",
      "Annotators know model identity",
      "No uncertainty reporting"
    ],
    "memory": "Blind pairwise review with a strong rubric scales human judgement more reliably."
  },
  {
    "id": "ai-kit-065",
    "title": "End-to-End RAG Evaluation",
    "category": "Evaluation & Metrics",
    "question": "How would you evaluate a RAG system end-to-end, separating retrieval quality from generation quality (e.g., faithfulness, answer relevance and context precision/recall as in RAGAS)?",
    "technical": [
      "Create questions with expected evidence, answer criteria and no-answer labels.",
      "Score retrieval independently using recall@k, precision@k, MRR or NDCG plus ACL correctness before scoring generation.",
      "Score generation for correctness, groundedness/faithfulness, relevance, citation support, completeness and abstention; frameworks such as RAGAS can assist, but calibrate automated judges with human labels.",
      "Track end-to-end task success, latency, cost and slices by source type, language, tenant and question type; diagnose failures by stage."
    ],
    "layman": "Test the librarian and the writer separately, then test whether the complete service helps the customer.",
    "usecases": [
      "Release gate for a policy assistant"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q65\n\nStages:\n1 source/index coverage\n2 top-k evidence recall\n3 answer/citation quality\n4 user task success",
    "followups": [
      "How are table questions represented?",
      "How do you evaluate conflicting sources?",
      "How are no-answer cases scored?",
      "How do you avoid judge bias?"
    ],
    "redflags": [
      "Only final-answer rating",
      "No retrieval labels"
    ],
    "memory": "Separate retrieval from generation, then measure complete user success."
  },
  {
    "id": "ai-kit-067",
    "title": "Production LLM Evaluation Programme",
    "category": "Evaluation & Metrics",
    "question": "How do you set up evaluation for an LLM product in production: golden datasets, regression tests, A/B testing, and drift monitoring?",
    "technical": [
      "Maintain versioned golden datasets covering common, difficult, ambiguous, no-answer, multilingual, adversarial and high-risk cases, with privacy controls.",
      "Run regression tests for prompts, models, retrieval, tools and safety on every release, evaluating retrieval and generation separately when RAG components change.",
      "Use shadow/canary/A-B rollout for real traffic and monitor quality proxies, latency, cost, escalation and drift.",
      "Define release gates for quality, groundedness, safety, latency and cost, plus rollback ownership and regular dataset refresh without overfitting to the test set."
    ],
    "layman": "Use a permanent examination suite before release, a small live trial after release and ongoing monitoring for changing conditions.",
    "usecases": [
      "LLM product release management"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q67\n\nRelease unit:\nmodel + prompt + tools + retrieval/index + safety policy + dataset version.",
    "followups": [
      "How are golden examples refreshed?",
      "What triggers rollback?",
      "Does an embedding change require reindexing?",
      "How is nondeterminism handled?"
    ],
    "redflags": [
      "No baseline",
      "Manual spot checks only",
      "Changes several components without attribution",
      "Uses only an LLM judge"
    ],
    "memory": "Version the whole AI system and gate it with offline plus controlled online evaluation."
  },
  {
    "id": "ai-kit-068",
    "title": "Model Context Protocol and the M×N Problem",
    "category": "Model Context Protocol",
    "question": "What is the Model Context Protocol (MCP), and what 'M×N integration problem' does it solve?",
    "technical": [
      "MCP defines a standard way for AI hosts to discover and interact with tools, resources and prompt templates exposed by servers.",
      "Without a standard, M AI applications integrating with N data/tool systems can require many custom adapters.",
      "A shared protocol reduces duplicated integration work and creates consistent discovery and invocation semantics.",
      "It does not replace application security, business APIs or governance."
    ],
    "layman": "Use one standard plug shape so many assistants can connect to many tools without a different custom cable for every pair.",
    "usecases": [
      "Expose internal developer tools to several AI clients"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q68\n\nWithout standard: many client-specific integrations.\nWith MCP: clients implement the protocol; servers expose standard capabilities.",
    "followups": [
      "What does MCP not solve?",
      "How is trust established?"
    ],
    "redflags": [
      "Calls MCP a model or database",
      "Assumes it automatically secures tools"
    ],
    "memory": "MCP standardises AI-to-tool/data integration; policy and execution remain application responsibilities."
  },
  {
    "id": "ai-kit-069",
    "title": "MCP Host, Client and Server",
    "category": "Model Context Protocol",
    "question": "Explain the MCP architecture: host, client, and server. What role does each play?",
    "technical": [
      "The host is the user-facing AI application that manages model interaction, permissions and overall experience.",
      "An MCP client inside the host establishes a session with a server and exchanges capability and invocation messages.",
      "The MCP server exposes tools, resources and prompts backed by a local or remote system.",
      "The host should remain the policy boundary and decide what capabilities enter model context."
    ],
    "layman": "The host is the office, the client is its authorised connector, and the server is the service desk exposing approved capabilities.",
    "usecases": [
      "Desktop coding assistant connecting to filesystem and issue-tracker servers"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q69\n\nHost/model ↔ MCP client ↔ transport ↔ MCP server ↔ product/data system",
    "followups": [
      "Where are credentials held?",
      "Can one host connect to several servers?"
    ],
    "redflags": [
      "Says the model directly opens arbitrary network connections",
      "No host policy layer"
    ],
    "memory": "Host orchestrates; client speaks MCP; server exposes controlled capabilities."
  },
  {
    "id": "ai-kit-070",
    "title": "MCP Tools, Resources and Prompts",
    "category": "Model Context Protocol",
    "question": "What are MCP's core primitives - tools, resources, and prompts? How does each get used by the model or the user?",
    "technical": [
      "Tools are executable operations with schemas, such as creating an issue or running a query.",
      "Resources are readable context identified by URIs or references, such as files or records.",
      "Prompts are reusable templates/workflows a server offers to the user or host.",
      "The host controls discovery, consent and what is passed to the model."
    ],
    "layman": "Tools do things, resources provide information, and prompts provide reusable instructions.",
    "usecases": [
      "Issue-tracker tool",
      "Read-only documentation resource",
      "Code-review prompt template"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q70\n\nTool: create_ticket(args)\nResource: docs://service/runbook\nPrompt: investigate_incident(service)",
    "followups": [
      "Should resources ever execute side effects?",
      "How are tool schemas validated?"
    ],
    "redflags": [
      "Treats prompts as trusted security rules",
      "No distinction between read and write capability"
    ],
    "memory": "MCP primitives separate actions, readable context and reusable prompt templates."
  },
  {
    "id": "ai-kit-071",
    "title": "MCP Transports",
    "category": "Model Context Protocol",
    "question": "What transports does MCP support (stdio, streamable HTTP/SSE)? When would you use local stdio vs. a remote server?",
    "technical": [
      "Local stdio connects a host to a locally launched server process and is suitable for desktop or developer integrations.",
      "Remote HTTP-based transport supports networked, shared services and requires authentication, TLS, tenancy, rate limits and lifecycle management.",
      "Transport choice affects trust boundary, deployment and observability but not the logical capability model.",
      "Follow the exact MCP specification/version supported by the chosen SDK."
    ],
    "layman": "Use a direct local pipe for a tool on the same computer and a secured network connection for a shared remote service.",
    "usecases": [
      "Local filesystem MCP server",
      "Remote enterprise CRM MCP server"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q71\n\nLocal: host launches server → stdin/stdout messages.\nRemote: authenticated HTTPS session → shared service.",
    "followups": [
      "What credentials are appropriate for remote use?",
      "How do you handle server availability?"
    ],
    "redflags": [
      "Exposes remote server without authentication",
      "Logs protocol messages containing secrets"
    ],
    "memory": "Local transport simplifies trusted desktop use; remote transport needs full service security."
  },
  {
    "id": "ai-kit-072",
    "title": "MCP vs. Function Calling or Custom Integrations",
    "category": "Model Context Protocol",
    "question": "How is MCP different from plain function calling or a custom plugin/API integration?",
    "technical": [
      "Function calling is a model/API feature for producing structured tool requests; it does not define cross-client discovery or server lifecycle.",
      "A custom plugin or REST adapter can be ideal for one product integration but creates bespoke coupling.",
      "MCP standardises how hosts discover and invoke capabilities from many servers, while the server may internally call REST APIs.",
      "Use the simplest architecture that meets reuse and ecosystem needs."
    ],
    "layman": "Function calling is the model filling an action form; MCP standardises how many assistants discover and submit those forms to many service desks.",
    "usecases": [
      "One internal assistant may use direct APIs; many AI clients may justify an MCP server"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q72\n\nModel tool call → host validates → MCP client invokes server → server calls underlying API.",
    "followups": [
      "Can MCP and function calling be used together?",
      "When is direct REST simpler?"
    ],
    "redflags": [
      "Claims MCP replaces REST",
      "Adds MCP for a single trivial integration with no reuse"
    ],
    "memory": "Function calling structures model intent; MCP standardises capability integration across hosts and servers."
  },
  {
    "id": "ai-kit-073",
    "title": "End-to-End MCP Tool Call",
    "category": "Model Context Protocol",
    "question": "Walk through an end-to-end MCP tool call: discovery, invocation, and how the result gets back into the model's context.",
    "technical": [
      "The host connects and negotiates capabilities with the server.",
      "The client lists available tools; selected tool definitions are exposed to the model under policy.",
      "The model proposes a tool name and structured arguments.",
      "The host validates identity, authorisation, schema, consent and risk, then invokes through the MCP client.",
      "The server executes, returns structured content/errors and the host decides what result enters model context."
    ],
    "layman": "Discover the approved service, let the model fill the form, have the office verify it, execute it, and return only the safe result.",
    "usecases": [
      "Create a project issue from a coding assistant"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q73\n\ndiscover → select capability → model proposes call → host validates → server executes → sanitised result → model continues",
    "followups": [
      "Who executes the tool?",
      "What if the tool result contains malicious instructions?"
    ],
    "redflags": [
      "Model bypasses host validation",
      "Raw tool output trusted as instruction"
    ],
    "memory": "The model proposes; the host authorises; the server executes; the host sanitises the result."
  },
  {
    "id": "ai-kit-074",
    "title": "MCP Security Risks",
    "category": "Model Context Protocol",
    "question": "What are the security risks with MCP - tool poisoning, prompt injection through tool results, credential exposure - and how do you mitigate them?",
    "technical": [
      "Tool poisoning can advertise misleading names/descriptions or altered behaviour; pin and review trusted servers and capability changes.",
      "Tool/resource results can contain indirect prompt injection; treat all returned content as untrusted data.",
      "Protect credentials with scoped identity, server-side secret handling and no credential exposure to model context.",
      "Use allowlists, least privilege, user consent, schema validation, sandboxing, egress controls, audit and revocation."
    ],
    "layman": "A standard connector does not make every connected service trustworthy; each service and returned document still requires inspection and limited access.",
    "usecases": [
      "Enterprise MCP gateway or approved server registry"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q74\n\nSecurity gates:\nserver trust → capability review → user/resource auth → argument validation → sandbox/egress → result sanitisation → audit",
    "followups": [
      "How are server updates approved?",
      "How do you prevent confused-deputy actions?"
    ],
    "redflags": [
      "Automatically trusts any discovered server",
      "Passes access tokens into prompts"
    ],
    "memory": "Standard connectivity increases the need for server trust, least privilege and result sanitisation."
  },
  {
    "id": "ai-kit-075",
    "title": "When to Build an MCP Server",
    "category": "Model Context Protocol",
    "question": "When would you build an MCP server for your product vs. just exposing a REST API? What do you gain?",
    "technical": [
      "Build an MCP server when multiple AI hosts need reusable discovery and model-friendly access to product capabilities.",
      "Keep or expose a normal REST/gRPC business API as the stable system contract; MCP can be an AI-facing adapter.",
      "Direct API integration is simpler for one controlled client, strict deterministic workflows or where MCP ecosystem value is absent.",
      "Assess authentication, support, versioning, observability and the risk of exposing write actions."
    ],
    "layman": "Build the standard service desk when many assistants need the same capabilities; use a direct phone line for one tightly controlled integration.",
    "usecases": [
      "Product offers search, read and create operations to several AI development tools"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q75\n\nArchitecture:\nAI hosts → MCP server adapter → existing domain APIs\nNon-AI clients → existing REST/gRPC APIs",
    "followups": [
      "Should MCP contain business logic?",
      "How are breaking changes versioned?"
    ],
    "redflags": [
      "Replaces mature domain API entirely without reason",
      "Exposes every internal endpoint as a tool"
    ],
    "memory": "MCP is valuable as a reusable AI-facing capability layer, not a replacement for sound domain APIs."
  },
  {
    "id": "ai-kit-077",
    "title": "Core Agent Components",
    "category": "AI Agents",
    "question": "What are the core components of an agent - the LLM 'brain', tools, memory, and the reasoning/acting loop?",
    "technical": [
      "The model interprets state and proposes decisions.",
      "Tools provide controlled access to external actions and information.",
      "Short-term state holds the current task; long-term memory stores selected durable knowledge.",
      "An orchestrator manages the reasoning/action loop, policy, limits, checkpoints and termination.",
      "Observability records prompts, decisions, calls, results and costs."
    ],
    "layman": "An agent needs a decision-maker, a toolbox, a notebook and a supervisor controlling the process.",
    "usecases": [
      "Customer support agent"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q77\n\nInput/goal + state → model decision → policy gate → tool → observation → state update → completion or next step",
    "followups": [
      "Where is authorisation enforced?",
      "What should never enter long-term memory?"
    ],
    "redflags": [
      "Model directly owns credentials",
      "No orchestrator or limits"
    ],
    "memory": "Agent = model + tools + state/memory + controlled loop."
  },
  {
    "id": "ai-kit-078",
    "title": "ReAct Pattern",
    "category": "AI Agents",
    "question": "Explain the ReAct pattern. Why does interleaving reasoning and action beat one-shot generation for complex tasks?",
    "technical": [
      "ReAct interleaves reasoning/planning with actions and observations rather than generating a complete answer in one pass.",
      "The agent can gather missing facts, adapt after tool results and correct a plan.",
      "Production implementations should store structured actions/observations and avoid exposing sensitive private reasoning.",
      "Set step limits and use deterministic checks because more steps also create more failure opportunities."
    ],
    "layman": "Think about the next step, act, inspect the result and then decide again.",
    "usecases": [
      "Research across several sources",
      "Troubleshooting with diagnostic tools"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q78\n\nLoop:\nassess state → choose tool → execute → observe → update plan → finish/escalate",
    "followups": [
      "When does ReAct become an expensive loop?",
      "How are tool failures handled?"
    ],
    "redflags": [
      "Logs unrestricted chain-of-thought",
      "No stop condition"
    ],
    "memory": "ReAct gains adaptability by alternating decisions and observations under strict limits."
  },
  {
    "id": "ai-kit-079",
    "title": "How Tool Calling Works",
    "category": "AI Agents",
    "question": "How does function/tool calling work under the hood? How does the model decide which tool to call and who executes it?",
    "technical": [
      "The application provides the model with tool names, descriptions and argument schemas.",
      "The model emits a structured proposal based on context; it does not itself execute the external operation.",
      "Application code validates arguments, identity, authorisation and policy, executes the tool and returns a controlled result.",
      "The model then uses the result to continue or produce a final answer."
    ],
    "layman": "The model fills out an approved request form; trusted application code decides whether to submit it and performs the work.",
    "usecases": [
      "Lookup order status",
      "Create a support ticket"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q79\n\ntool schema → model proposal → validator/policy → executor → sanitised result → model",
    "followups": [
      "What if arguments are valid JSON but unsafe?",
      "How is idempotency handled for write tools?"
    ],
    "redflags": [
      "Says the model directly runs code/API calls",
      "Validates schema but not permissions"
    ],
    "memory": "Models propose tool calls; trusted code authorises and executes them."
  },
  {
    "id": "ai-kit-080",
    "title": "Short-term and Long-term Agent Memory",
    "category": "AI Agents",
    "question": "Explain short-term vs. long-term memory for agents. How would you implement persistent memory (e.g., with a vector store)?",
    "technical": [
      "Short-term memory is task/session state: conversation, plan, observations and working variables.",
      "Long-term memory persists selected information across sessions, such as user-approved preferences or prior outcomes.",
      "A vector store can retrieve semantically relevant memories, but memory needs provenance, tenancy, retention, consent, deletion and relevance scoring.",
      "Summarise and compact state; do not indiscriminately store every conversation."
    ],
    "layman": "Short-term memory is today’s notepad; long-term memory is an indexed archive that should store only approved useful facts.",
    "usecases": [
      "Persistent user preferences",
      "Agent task history and learned runbook hints"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q80\n\nMemory record:\nowner/tenant + content + source + timestamp + expiry + sensitivity + embedding",
    "followups": [
      "How do you prevent stale memory?",
      "How is a user memory deleted?"
    ],
    "redflags": [
      "Stores all prompts forever",
      "Uses vector similarity as authorisation"
    ],
    "memory": "Agent memory must be selective, permissioned, traceable and deletable."
  },
  {
    "id": "ai-kit-081",
    "title": "Agent Planning Approaches",
    "category": "AI Agents",
    "question": "How do agents plan? Compare plan-and-execute with iterative ReAct-style task decomposition.",
    "technical": [
      "Plan-and-execute creates a higher-level plan then assigns/executes steps; it provides structure but can become stale when observations change.",
      "Iterative ReAct chooses the next action dynamically and adapts well but can wander or loop.",
      "Hybrid systems create a coarse plan, execute with checkpoints and re-plan only when needed.",
      "Use deterministic workflows for known critical sequences."
    ],
    "layman": "One approach writes the full itinerary first; another chooses each next turn using current road conditions.",
    "usecases": [
      "Research project",
      "Multi-step support diagnosis"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q81\n\nHybrid:\nplan milestones → execute bounded step → validate checkpoint → continue or re-plan",
    "followups": [
      "How do you validate a plan before execution?",
      "When should the plan be immutable?"
    ],
    "redflags": [
      "Lets model invent unrestricted plan steps",
      "No re-planning or checkpoint policy"
    ],
    "memory": "Plans provide structure; iterative action provides adaptation; production systems often combine both."
  },
  {
    "id": "ai-kit-082",
    "title": "Agent Failure Modes and Cost Controls",
    "category": "AI Agents",
    "question": "How do you handle agent failure modes: infinite loops, repeated tool errors, and runaway costs (max iterations, timeouts, retries)?",
    "technical": [
      "Set maximum iterations, wall-clock deadlines, token and monetary budgets and tool-specific concurrency limits.",
      "Classify tool errors as retryable/non-retryable; use bounded backoff, circuit breakers and alternate paths.",
      "Detect repeated state/action loops and stop or escalate.",
      "Checkpoint state, make side-effecting tools idempotent and expose partial outcomes safely."
    ],
    "layman": "Give the agent a time limit, spending limit, step limit and a rule to ask for help when stuck.",
    "usecases": [
      "Long-running research or support agent"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q82\n\nStop conditions:\nmax_steps=8\ndeadline=60s\nbudget=£0.50\nrepeat_action_limit=2\nwrite actions require approval",
    "followups": [
      "How do you identify loops?",
      "What if a tool is rate-limited?"
    ],
    "redflags": [
      "Unlimited autonomous retries",
      "No budget or deadline"
    ],
    "memory": "Bound every agent loop by steps, time, cost, retries and permissions."
  },
  {
    "id": "ai-kit-083",
    "title": "Agent Frameworks vs. Direct Model APIs",
    "category": "AI Agents",
    "question": "Compare agent frameworks - LangGraph, CrewAI, AutoGen. When would you skip frameworks and build directly on the model API?",
    "technical": [
      "LangGraph emphasises stateful graph workflows and durable control; CrewAI emphasises role-based teams; AutoGen supports conversational multi-agent patterns.",
      "Frameworks can accelerate orchestration, checkpoints and integrations but add abstractions, version risk and debugging complexity.",
      "Use direct APIs for small, stable workflows when explicit code is clearer and easier to secure.",
      "Evaluate framework maturity, persistence, observability, portability and failure control."
    ],
    "layman": "A framework provides scaffolding, but a small building may be safer with a simple visible structure.",
    "usecases": [
      "Complex resumable workflow versus a two-tool assistant"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q83\n\nDecision checklist:\nstate complexity, durability, human approval, tool count, observability, vendor lock-in, team expertise.",
    "followups": [
      "How do you migrate away from the framework?",
      "Where is state persisted?"
    ],
    "redflags": [
      "Chooses framework by popularity only",
      "Hides business logic in prompts"
    ],
    "memory": "Use a framework when it simplifies real orchestration needs; otherwise prefer explicit code."
  },
  {
    "id": "ai-kit-084",
    "title": "Human-in-the-Loop Approval",
    "category": "AI Agents",
    "question": "Where would you insert human-in-the-loop approval in an agent, and why is it essential for high-stakes actions?",
    "technical": [
      "Require approval before irreversible, financial, legal, privacy-sensitive or externally visible actions.",
      "Present the proposed action, rationale/evidence, affected resources, risk and exact parameters to the approver.",
      "Bind approval to a specific immutable action and expiry so the agent cannot change it after approval.",
      "Support rejection, editing, escalation and full audit."
    ],
    "layman": "The assistant can prepare the bank transfer, but an authorised person must approve the exact amount and recipient.",
    "usecases": [
      "Refunds",
      "Account deletion",
      "Production deployment",
      "Sending confidential data"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q84\n\nApproval object:\naction_hash + user + tenant + parameters + expiry + approver + timestamp",
    "followups": [
      "Where in the workflow should approval occur?",
      "How do you prevent approval replay?"
    ],
    "redflags": [
      "Generic “approve agent” button",
      "Approval before final parameters are known"
    ],
    "memory": "Approval must cover the exact high-risk action immediately before execution."
  },
  {
    "id": "ai-kit-085",
    "title": "Agent Guardrails",
    "category": "AI Agents",
    "question": "What guardrails would you put around an agent - input/output validation, sandboxed execution, and scoped permissions?",
    "technical": [
      "Validate inputs for policy, injection and data classification; validate outputs against schemas and safety requirements.",
      "Run code or browser tools in sandboxed environments with restricted filesystem, network, time and resources.",
      "Use least-privilege scoped credentials and server-side resource authorisation.",
      "Apply allowlists, rate/cost limits, content/DLP checks, monitoring and human approval."
    ],
    "layman": "Give the agent child-safe tools: limited keys, fenced work areas, spending caps and adult approval for dangerous actions.",
    "usecases": [
      "Coding agent executing tests",
      "Support agent reading customer data"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q85\n\nGuardrail layers:\ninput → policy → model → tool proposal → auth/schema → sandbox → output/DLP → audit",
    "followups": [
      "Can output filtering replace tool permissions?",
      "How are sandboxes reset?"
    ],
    "redflags": [
      "Relies on prompt-only guardrails",
      "Agent receives broad admin credentials"
    ],
    "memory": "Guardrails must constrain data, permissions, execution and outcomes outside the model."
  },
  {
    "id": "ai-kit-086",
    "title": "Private and Sensitive Data for Agents",
    "category": "AI Agents",
    "question": "How do you safely give an agent access to private or sensitive data?",
    "technical": [
      "Authenticate the user and propagate trusted tenant/resource context.",
      "Retrieve only minimum necessary data through policy-enforcing services; never give broad database credentials to the model.",
      "Use encryption, private networking, scoped identity, redaction/tokenisation and retention controls.",
      "Prevent sensitive data from entering prompts, logs or memory unless explicitly approved and required.",
      "Audit every access and support deletion."
    ],
    "layman": "The agent receives only the exact authorised file needed for the task, not a master key to the archive.",
    "usecases": [
      "Healthcare or financial support assistant"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q86\n\nPattern:\nuser identity → policy service → scoped data API → redacted response → model context → audited output",
    "followups": [
      "How is tenant isolation tested?",
      "What goes into long-term memory?"
    ],
    "redflags": [
      "Direct DB access with shared credentials",
      "Full customer record placed in prompts unnecessarily"
    ],
    "memory": "Give agents scoped data through authorised APIs, not unrestricted stores."
  },
  {
    "id": "ai-kit-087",
    "title": "Agent Observability and Replay",
    "category": "AI Agents",
    "question": "How do you make agents observable in production - tracing, logging every tool call, and replaying trajectories?",
    "technical": [
      "Trace each run with model/prompt version, state transitions, tool proposals, policy decisions, execution results, latency, tokens and cost.",
      "Use structured logs and distributed traces with correlation IDs, while redacting secrets and sensitive content.",
      "Persist enough deterministic state and external-result references to replay or simulate trajectories.",
      "Create dashboards for task success, loops, tool failures, approval rates and safety events."
    ],
    "layman": "A flight recorder captures every approved step so a failed mission can be reconstructed safely.",
    "usecases": [
      "Debugging a failed support or coding-agent run"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q87\n\nRun trace:\nrun_id → step_id → state_hash → model/version → tool/args hash → policy result → observation → cost → next state",
    "followups": [
      "Can exact model output always be reproduced?",
      "How do you protect trace data?"
    ],
    "redflags": [
      "Logs only final answer",
      "Stores raw secrets in traces"
    ],
    "memory": "Production agents need step-level flight recorders with privacy controls."
  },
  {
    "id": "ai-kit-088",
    "title": "Agentic AI Spectrum",
    "category": "Agentic AI",
    "question": "What does 'agentic AI' mean, and how does an agent differ from a plain LLM chatbot or a fixed workflow? Describe the spectrum from a single LLM call to a fully autonomous system.",
    "technical": [
      "Agentic AI describes systems that pursue goals through multi-step decisions and actions with varying autonomy.",
      "A plain chatbot generates responses and a fixed workflow follows predefined branches; an agent uses a model to choose actions and tools and adapt based on observations toward a goal.",
      "Spectrum: single model call → prompt chain → tool-using workflow → adaptive single agent → coordinated agents → bounded autonomous system.",
      "More autonomy increases flexibility but also cost, nondeterminism, security and operational burden.",
      "Select the lowest level that meets the business need.",
      "Agents require state, limits, policy, observability and recovery."
    ],
    "layman": "Automation ranges from answering one question to independently choosing and executing several approved steps.",
    "usecases": [
      "Research workflow",
      "Support resolution",
      "Coding automation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q88\n\nAutonomy ladder:\ncall → chain → routed workflow → agent loop → multi-agent → bounded autonomy\n\nAgent loop:\ngoal → choose action → execute tool → observe result → update state → stop/escalate",
    "followups": [
      "What makes a system genuinely agentic?",
      "Where should autonomy stop?",
      "When is a workflow safer?"
    ],
    "redflags": [
      "Labels any prompt chain agentic",
      "Assumes maximum autonomy is desirable"
    ],
    "memory": "Agentic systems exist on a spectrum; autonomy should be deliberately bounded."
  },
  {
    "id": "ai-kit-089",
    "title": "Workflows vs. Agents and Common Patterns",
    "category": "Agentic AI",
    "question": "Workflows vs. agents: explain patterns like prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer. When is a workflow enough?",
    "technical": [
      "Prompt chaining uses known sequential stages; routing selects a specialised path; parallelisation runs independent subtasks concurrently.",
      "Orchestrator–workers delegates bounded tasks and combines results; evaluator–optimizer iterates with a quality check.",
      "A workflow is enough when steps and decisions are known and can be encoded deterministically.",
      "Use agents only when unanticipated conditions require adaptive action selection."
    ],
    "layman": "Use a checklist when the route is known; use an agent when it must choose the route from changing conditions.",
    "usecases": [
      "Document extraction pipeline",
      "Parallel research synthesis"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q89\n\nPattern choice:\nknown steps → chain/workflow\nindependent tasks → parallel\nunknown next action → bounded agent",
    "followups": [
      "When does evaluator–optimizer loop stop?",
      "Can routing be deterministic?"
    ],
    "redflags": [
      "Uses agent for every workflow",
      "No termination criteria"
    ],
    "memory": "Prefer deterministic workflow patterns before adding adaptive autonomy."
  },
  {
    "id": "ai-kit-090",
    "title": "Multi-Agent Architectures",
    "category": "Agentic AI",
    "question": "Describe multi-agent architectures: supervisor, hierarchical, and peer-to-peer/swarm. Give a use case for each.",
    "technical": [
      "Supervisor architecture uses a central coordinator to delegate to specialists and integrate results.",
      "Hierarchical architecture has multiple coordination levels for complex decomposable programmes.",
      "Peer-to-peer or swarm patterns allow agents to communicate without one central controller but are harder to govern and debug.",
      "Use multi-agent only when specialisation or parallelism outweighs coordination cost."
    ],
    "layman": "A supervisor manages specialists; a hierarchy has managers and teams; a peer group coordinates directly.",
    "usecases": [
      "Supervisor for research specialists",
      "Hierarchy for large programme planning",
      "Peer pattern for bounded simulation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q90\n\nSupervisor → {search agent, data agent, writer} → verifier → final response",
    "followups": [
      "What if supervisor is wrong?",
      "How is shared state controlled?"
    ],
    "redflags": [
      "One agent per arbitrary function",
      "No central policy or conflict resolution"
    ],
    "memory": "Multi-agent topology determines coordination, failure propagation and governance."
  },
  {
    "id": "ai-kit-091",
    "title": "Agent Communication, Shared State and A2A",
    "category": "Agentic AI",
    "question": "How do agents in a multi-agent system communicate and coordinate - shared state vs. message passing? What is the A2A idea?",
    "technical": [
      "Shared state gives agents a common durable workspace but requires concurrency, schema and access controls.",
      "Message passing provides explicit events, ownership and decoupling but needs correlation, ordering and delivery semantics.",
      "Agent-to-agent concepts aim to standardise discovery, task delegation and result exchange between independently implemented agents.",
      "Keep communication typed, authenticated, bounded and auditable; do not pass unrestricted free-form instructions as authority."
    ],
    "layman": "Teams can work on one shared whiteboard or send signed task messages; both need rules to avoid overwriting or misunderstanding work.",
    "usecases": [
      "Long-running research agents sharing evidence",
      "Delegation across enterprise agent services"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q91\n\nTask message:\ntask_id + sender + recipient + goal + allowed resources + deadline + schema + trace_id",
    "followups": [
      "How are concurrent state updates resolved?",
      "How is an agent identity authenticated?"
    ],
    "redflags": [
      "Free-form chat used as the only protocol",
      "No task ownership or correlation IDs"
    ],
    "memory": "Agent coordination needs typed state/messages, identity and clear ownership."
  },
  {
    "id": "ai-kit-092",
    "title": "Single Agent vs. Multiple Specialists",
    "category": "Agentic AI",
    "question": "Single powerful agent vs. multiple specialized agents: what are the cost, latency, and complexity tradeoffs?",
    "technical": [
      "A single strong agent has simpler context, lower coordination latency and easier debugging.",
      "Specialised agents can isolate prompts/tools, parallelise work and improve expertise, but add model calls, context transfer and failure modes.",
      "Start with one agent or workflow, measure bottlenecks, then split only where specialisation or isolation is valuable.",
      "Compare task success, cost, latency, observability and security—not conceptual elegance."
    ],
    "layman": "One skilled generalist is easier to coordinate; a team of specialists can work faster but requires management and hand-offs.",
    "usecases": [
      "Research with search, data-analysis and writing roles"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q92\n\nExperiment:\nA: single agent with all tools\nB: supervisor + specialists\nCompare quality, steps, cost, latency and failures.",
    "followups": [
      "How much context is lost in hand-offs?",
      "Can tool permissions be isolated by specialist?"
    ],
    "redflags": [
      "Assumes multiple agents automatically improve quality",
      "No baseline single-agent test"
    ],
    "memory": "Add agents only when measured specialisation or parallelism beats coordination overhead."
  },
  {
    "id": "ai-kit-093",
    "title": "Durable Long-running Agent Workflows",
    "category": "Agentic AI",
    "question": "How do you manage state and orchestration in a long-running agentic workflow (checkpointing, resumability, durable execution)?",
    "technical": [
      "Persist explicit workflow state and checkpoint after meaningful steps.",
      "Use durable queues/workflow engines, idempotent activities, retry policies and compensation for side effects.",
      "Store versioned plans, approvals, external operation IDs and data references rather than relying only on prompt history.",
      "Support pause/resume, timeout, cancellation, migration and human intervention."
    ],
    "layman": "A long journey records progress at safe checkpoints so it can restart after a breakdown without repeating completed payments or actions.",
    "usecases": [
      "Multi-hour research, migration or onboarding agent"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q93\n\nState machine:\nCREATED → PLANNED → RUNNING(step n) → WAITING_APPROVAL → RESUMED → COMPLETED/FAILED/CANCELLED",
    "followups": [
      "How do you upgrade workflow code mid-run?",
      "How are non-idempotent actions compensated?"
    ],
    "redflags": [
      "Only stores chat transcript",
      "Restarts from the beginning after failure"
    ],
    "memory": "Durability comes from explicit state, checkpoints and idempotent activities—not long prompts."
  },
  {
    "id": "ai-kit-094",
    "title": "Context Engineering for Agents",
    "category": "Agentic AI",
    "question": "What is context engineering for agents? How do you handle context-window limits over long tasks (summarization, compaction, scratchpads)?",
    "technical": [
      "Context engineering selects and formats the instructions, task state, evidence, memory, tool descriptions and recent observations needed for each step.",
      "Use summarisation, compaction, retrieval, hierarchical state and separate durable scratch data from the model prompt.",
      "Keep critical constraints and current goals prominent; remove stale or duplicated context.",
      "Evaluate whether compaction preserves facts, commitments and pending actions."
    ],
    "layman": "Prepare a concise work folder for each step instead of carrying every document and conversation forever.",
    "usecases": [
      "Long-running research/coding agents"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q94\n\nContext layers:\npolicy + current goal + structured state + selected evidence + available tools + recent observations",
    "followups": [
      "What must never be summarised away?",
      "How do you prevent memory poisoning?"
    ],
    "redflags": [
      "Appends every past message indefinitely",
      "Uses summary without provenance"
    ],
    "memory": "Agent context should be curated from durable state, not accumulated without limit."
  },
  {
    "id": "ai-kit-095",
    "title": "Optimising Agent Cost and Latency",
    "category": "Agentic AI",
    "question": "How do you optimize cost and latency of an agentic system - model routing (small vs. large models), prompt caching, and parallel tool calls?",
    "technical": [
      "Route simple tasks to smaller models and escalate uncertain/complex tasks to larger models.",
      "Cache stable prompt prefixes and reusable retrieval/tool results where correctness allows.",
      "Parallelise independent tool calls, but bound concurrency and avoid duplicate work.",
      "Reduce context, batch operations, use structured tools and stop early when success criteria are met.",
      "Measure cost per successful task, not cost per call."
    ],
    "layman": "Use junior staff for routine checks, specialists for difficult cases, reuse prepared materials and run independent errands at the same time.",
    "usecases": [
      "High-volume customer-support automation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q95\n\nCost policy:\nsmall model triage → deterministic tool/workflow → large model only for complex synthesis → human escalation for high risk",
    "followups": [
      "When is caching unsafe?",
      "How do parallel calls affect rate limits?"
    ],
    "redflags": [
      "Uses cheapest model regardless of failure cost",
      "Optimises token cost but increases retries"
    ],
    "memory": "Optimise cost and latency at task level with routing, caching, parallelism and early stopping."
  },
  {
    "id": "ai-kit-096",
    "title": "Reliability Across Multi-step Trajectories",
    "category": "Agentic AI",
    "question": "Errors compound across multi-step trajectories: if each step is 95% reliable, a 20-step task mostly fails. How do you engineer reliability into agentic pipelines?",
    "technical": [
      "Step-level accuracy compounds, so reduce unnecessary steps and make each step verifiable.",
      "Use deterministic tools, typed schemas, invariants, checkpoints, retries only for transient failures and independent verification for critical outputs.",
      "Design recovery/compensation and human escalation rather than assuming every step succeeds.",
      "Evaluate complete trajectories and common branch failures."
    ],
    "layman": "A chain is only as reliable as all its links; use fewer links and inspect critical connections.",
    "usecases": [
      "Twenty-step onboarding or coding workflow"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q96\n\nIf independent step success = 0.95, 20-step success ≈ 0.95²⁰ ≈ 0.36.\nImprove by reducing steps, verifying and recovering.",
    "followups": [
      "Are step failures independent?",
      "Where should verification be inserted?"
    ],
    "redflags": [
      "Only improves the base model",
      "No end-state invariant checks"
    ],
    "memory": "Agent reliability requires fewer steps, verification, checkpoints and recovery."
  },
  {
    "id": "ai-kit-097",
    "title": "Safety Risks Unique to Agentic AI",
    "category": "Agentic AI",
    "question": "What safety concerns are unique to agentic AI - irreversible actions, permission scoping, sandboxing - and how do you address them?",
    "technical": [
      "Agents can take irreversible actions, amplify a mistaken plan, combine permissions and operate at machine speed.",
      "Use least privilege, read/write separation, sandboxes, allowlisted tools/destinations, approval and transaction limits.",
      "Make side effects idempotent, reversible or compensatable and provide emergency stop/revocation.",
      "Threat-model prompt injection, confused deputy, data exfiltration, resource exhaustion and unsafe delegation."
    ],
    "layman": "A mistaken answer is harmful; a mistaken autonomous action can immediately move money, delete data or contact customers.",
    "usecases": [
      "Payment, deployment, account-management agents"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q97\n\nSafety pattern:\nread-only by default → explicit write capability → exact approval → execution limit → audit → compensation/kill switch",
    "followups": [
      "How are privileges revoked during a run?",
      "Which actions are irreversible?"
    ],
    "redflags": [
      "One broad service account",
      "No kill switch or human approval"
    ],
    "memory": "Agentic safety controls authority and side effects, not only generated text."
  },
  {
    "id": "ai-kit-098",
    "title": "Evaluating Agentic Systems",
    "category": "Agentic AI",
    "question": "How do you evaluate agentic systems - task completion rate, tool-call accuracy, trajectory analysis, and benchmarks like SWE-bench or GAIA?",
    "technical": [
      "Measure end-to-end task completion under realistic environments and constraints.",
      "Analyse trajectories for planning quality, tool accuracy, unnecessary steps, recovery, policy compliance and human intervention.",
      "Check tool-call accuracy in detail: tool selection, arguments, authorisation and execution outcome.",
      "Benchmarks such as coding or general-assistant suites are useful, but product-specific environments and hidden tests are essential.",
      "Report success, cost, latency, variance and failure categories across repeated runs."
    ],
    "layman": "Test whether the team completes the real job safely and efficiently, not just whether its final report sounds good.",
    "usecases": [
      "Coding agent evaluated with tests",
      "Research agent evaluated for evidence coverage"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q98\n\nScorecard:\ntask success + hidden checks + policy violations + tool error recovery + steps + time + cost",
    "followups": [
      "How many repeated runs are needed?",
      "How are environment side effects reset?",
      "How do you score partially completed tasks?"
    ],
    "redflags": [
      "One demo run",
      "Only evaluates final prose",
      "No tool or security evaluation"
    ],
    "memory": "Evaluate agentic systems by outcomes, trajectories, safety, cost and variability."
  },
  {
    "id": "ai-kit-099",
    "title": "Why Real Agentic Use Cases Are Hard",
    "category": "Agentic AI",
    "question": "Pick a real agentic use case (coding agent, deep research, customer support automation). What makes it hard in practice?",
    "technical": [
      "Coding agents face incomplete requirements, large repositories, environment setup, flaky tests and safe patch/application constraints.",
      "Research agents face source quality, conflicting evidence, freshness, citation and stopping problems.",
      "Support agents face identity, private data, policy ambiguity, integration failures and escalation.",
      "Across use cases, state, permissions, evaluation, observability and recovery are harder than the demo."
    ],
    "layman": "The difficult part is not generating one clever answer; it is operating reliably amid missing information, changing systems and real consequences.",
    "usecases": [
      "Coding agent",
      "Deep-research agent",
      "Customer-support automation"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q99\n\nInterview structure:\nuse case → environment/tools → failure modes → safety → evaluation → human hand-off → cost/operations",
    "followups": [
      "What is the highest-risk side effect?",
      "What is the fallback when the agent is uncertain?"
    ],
    "redflags": [
      "Describes only happy-path prompt",
      "No integration or operations detail"
    ],
    "memory": "Production agent difficulty comes from environment, authority, uncertainty and recovery—not model calls alone."
  },
  {
    "id": "ai-kit-100",
    "title": "Current Limits and Near-term Direction of Agentic AI",
    "category": "Agentic AI",
    "question": "What are the current limitations of agentic AI (long-horizon planning, reliability, cost), and where do you see it going in the next 2 years?",
    "technical": [
      "Current limitations include unreliable long-horizon planning, compounding errors, brittle tool use, incomplete environment understanding, security risk, latency and cost.",
      "Evaluation and reproducibility remain difficult because environments and model outputs vary.",
      "A reasonable near-term direction is more bounded autonomy: durable workflow engines, stronger tool contracts, smaller specialised models, better verification, policy enforcement and human checkpoints.",
      "This is an engineering outlook, not a guaranteed forecast; successful systems will likely remain domain-specific and heavily instrumented."
    ],
    "layman": "Agents are promising apprentices, but they still need scoped jobs, checklists, supervision and reliable tools for long assignments.",
    "usecases": [
      "Roadmap discussion for production agent platforms"
    ],
    "code": "Source question: 100-AI-Interview-Questions.pdf · Q100\n\nLikely progression:\ndemos → bounded workflows → verified domain agents → carefully expanded autonomy, with humans retained for high-risk decisions.",
    "followups": [
      "Which limitation is model-related versus systems-related?",
      "What evidence would justify more autonomy?"
    ],
    "redflags": [
      "Predicts fully autonomous general workers as certain",
      "Ignores economics and governance"
    ],
    "memory": "Near-term progress is likely to come from bounded, verifiable systems—not unlimited autonomy."
  },
  {
    "id": "multimodal-rag-structure-preserving",
    "title": "Multimodal RAG · Preserve Tables, Images and Text Relationships",
    "category": "Multimodal RAG Deep Dive",
    "question": "Your PDF contains tables, images and text. After chunking, the relationships between them are lost. How will you design a RAG pipeline?",
    "technical": [
      "<strong>Core problem:</strong> a PDF is a layout, not a plain stream of text. Fixed-size splitting can separate a table from its caption and the paragraph that explains it.",
      "<strong>Stage 1 — Layout-aware parsing:</strong> use a parser such as Unstructured, Docling, LlamaParse or a document-intelligence service to produce typed elements, page numbers, bounding boxes and reading order. Preserve tables as structured HTML or Markdown and extract images as assets.",
      "<strong>Stage 2 — Structure-aware chunking:</strong> chunk by headings, sections and document elements. Add section hierarchy, page number and explicit links such as caption_of, referenced_by, parent and sibling IDs. Keep captions and introducing sentences with tables/figures.",
      "<strong>Stage 3 — Multi-vector indexing:</strong> use a vision-capable model to create searchable natural-language summaries for tables and images. Embed summaries, but store the original table/image separately under a stable ID.",
      "<strong>Stage 4 — Retrieval and generation:</strong> combine dense and BM25 retrieval, rerank candidates, fetch the raw parent element and linked sibling context, and send the actual table Markdown and image to a multimodal model.",
      "<strong>Stage 5 — Evaluation:</strong> measure recall@k/MRR and generation faithfulness/relevance. Include dedicated table-lookup, figure-interpretation and relationship questions in the golden set.",
      "<strong>Alternative:</strong> joint image–text embeddings or page-image retrieval such as ColPali-style architectures can avoid conventional parsing, but must be benchmarked for text-query alignment, cost, citations and access control.",
      "<strong>Spreadsheet routing:</strong> retrieve rows for lookup questions, but route analytical questions to a real query engine such as SQL/DuckDB. Rows are for retrieving; tables are for querying."
    ],
    "layman": "Do not cut a report into random strips. First understand pages, headings, captions, tables and pictures; keep a map of how they relate, search using summaries, then give the model the original table or image together with its surrounding explanation.",
    "usecases": [
      "Annual reports where a paragraph explains a chart on another part of the page",
      "Technical manuals with diagrams, captions and referenced procedures",
      "Research papers containing tables, equations and figures",
      "Spreadsheet assistants that route lookup to retrieval and calculations to SQL"
    ],
    "code": "Structure-preserving pipeline:\n\nPDF / Office / scanned page\n  → layout-aware parser\n  → typed elements + bounding boxes + reading order\n  → section-aware chunks + relational metadata\n  → text embeddings + table/image summaries\n  → vector index + raw document store\n  → hybrid retrieval + reranking\n  → fetch raw parent and sibling context\n  → multimodal LLM\n  → cited answer + evaluation trace\n\nOne-line interview close:\n“I parse for structure, chunk by sections with relational metadata, index summaries while storing raw elements, retrieve hybrids and fetch the originals, and give the multimodal model the real table and image.”",
    "followups": [
      "Why not embed images directly?",
      "How do you preserve a table’s caption and introducing paragraph?",
      "How do you keep raw elements and summary vectors version-consistent?",
      "How would the design change for spreadsheets?",
      "How do you evaluate figure and table questions separately?"
    ],
    "redflags": [
      "Uses fixed-size text chunking for every PDF",
      "Embeds OCR text but discards page/layout relationships",
      "Returns only a generated table summary instead of the original element",
      "Uses retrieval to calculate spreadsheet aggregates instead of a query engine",
      "Has no multimodal or table-specific evaluation set"
    ],
    "memory": "Parse layout, preserve relationships, index summaries, retrieve originals, and evaluate table/figure questions explicitly."
  }
];
