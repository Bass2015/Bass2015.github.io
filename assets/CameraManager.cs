using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraManager : MonoBehaviour
{
    [SerializeField]
    Transform mainShip;
    [SerializeField]
    Transform moduleToFollow;
    public Transform newModule;

    public float distance;
    public float verticalOffset;
    public float inclination;
    public float smoothTime;

   public float maxDistanceWhileMoving;

    Camera cam;

    bool changingModule;

    Vector3 velocity;


    private void Start()
    {
        cam = GetComponent<Camera>();
        ModuleConnectedEventDispatcher.ModuleConnectedEvent += OnModuleConnectedEvent;
    }
    private void OnEnable()
    {
        ModuleConnectedEventDispatcher.ModuleConnectedEvent += OnModuleConnectedEvent;
    }
    private void OnDisable()
    {
        ModuleConnectedEventDispatcher.ModuleConnectedEvent -= OnModuleConnectedEvent;
    }

    // Update is called once per frame
    void LateUpdate()
    {
        if (Input.GetKeyDown(KeyCode.F))
        {
            StartCoroutine("ChangeModule", newModule);
        }
        if (!changingModule)
        {
            transform.position = FollowModule(moduleToFollow);
            LookAtStation();
        }

    }
    

    public void OnModuleConnectedEvent (Transform moduleConnected, Transform newModule)
    {
        this.newModule = newModule;
        StartCoroutine("ChangeModule", newModule);
    }


    private Vector3 FollowModule(Transform module)
    {
        Vector3 fromModuleToShip = mainShip.position - module.position;
        Vector3 newPos = module.position - fromModuleToShip.normalized * distance;
        Vector3 crossDirection = Vector3.Cross(fromModuleToShip, module.right * -1).normalized;
        crossDirection = new Vector3(crossDirection.x, Mathf.Abs(crossDirection.y), crossDirection.z);
        return newPos + crossDirection * verticalOffset;
    }

    private void LookAtStation()
    {
        Vector3 fromModuleToShip = mainShip.position - transform.position;
        transform.forward = fromModuleToShip;
        Vector3 eulerLocalRot = transform.localRotation.eulerAngles;
        Quaternion newLocalRot = Quaternion.Euler(eulerLocalRot.x - inclination, eulerLocalRot.y, eulerLocalRot.z);
        transform.localRotation = newLocalRot;

    }

    private float GetGreatestDistance(Transform newModule)
    {
        Bounds bounds = new Bounds(moduleToFollow.position, Vector3.zero);
        bounds.Encapsulate(newModule.position);
        return bounds.size.x;
    }

    private IEnumerator ChangeModule(Transform newModule)
    {
        changingModule = true;
        Bounds bounds = new Bounds(moduleToFollow.position, Vector3.zero);
        bounds.Encapsulate(newModule.position);
        Vector3 centerPoint = bounds.center;
        float distance = (centerPoint - transform.position).magnitude;
        while(distance < maxDistanceWhileMoving - 0.05 )
        {
            Vector3 newPos = Vector3.SmoothDamp(transform.position, centerPoint, ref velocity, smoothTime);


            Vector3 fromModuleToShip = mainShip.position - transform.position;
            newPos = newPos - fromModuleToShip.normalized * maxDistanceWhileMoving;

            transform.position = Vector3.SmoothDamp(transform.position, newPos, ref velocity, smoothTime); ;
            
            
            LookAtStation();
            
            distance = (centerPoint - transform.position).magnitude;
            yield return new WaitForEndOfFrame();
        }
    

        moduleToFollow = newModule;
        while (distance > this.distance)
        {
            Vector3 newPos = Vector3.SmoothDamp(transform.position, FollowModule(moduleToFollow), ref velocity, smoothTime);

            Vector3 fromModuleToShip = mainShip.position - transform.position;
            newPos = newPos - fromModuleToShip.normalized * this.distance;

            transform.position = Vector3.SmoothDamp(transform.position, newPos, ref velocity, smoothTime); ;
            LookAtStation();
            distance = (moduleToFollow.position - transform.position).magnitude;
            yield return new WaitForEndOfFrame();
        }
        changingModule = false;
    }
}